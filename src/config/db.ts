// backend/src/config/db.ts
import mongoose from "mongoose";

const {
  MONGO_URI = "",
  MONGO_CONNECT_RETRY_MS = "2000",
  MONGO_CONNECT_MAX_RETRIES = "5",
  NODE_ENV = "development",
} = process.env;

if (!MONGO_URI) {
  // Fail fast if env is not set
  console.error("MONGO_URI is not set in environment variables.");
  // don't throw on import-time in some dev setups, but exit is safer
  throw new Error("Missing MONGO_URI env var");
}

const RETRY_MS = parseInt(MONGO_CONNECT_RETRY_MS, 10) || 2000;
const MAX_RETRIES = parseInt(MONGO_CONNECT_MAX_RETRIES, 10) || 5;

let retries = 0;

/**
 * Connect to MongoDB using mongoose.
 * Returns the mongoose.Connection when resolved.
 */
export async function connectDB(): Promise<typeof mongoose> {
  const options: mongoose.ConnectOptions = {
    // modern mongoose defaults (some keys optional depending on mongoose version)
    // useUnifiedTopology & useNewUrlParser are default in modern mongoose but kept for clarity
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // autoIndex: NODE_ENV !== "production", // optional
  } as mongoose.ConnectOptions;

  async function attemptConnect(): Promise<typeof mongoose> {
    try {
      await mongoose.connect(MONGO_URI, options);
      console.info("MongoDB connected.");
      // optional: show DB name
      // @ts-ignore
      console.info(`MongoDB host: ${mongoose.connection.host}, db: ${mongoose.connection.name}`);
      return mongoose;
    } catch (err) {
      retries += 1;
      console.error(`MongoDB connection attempt ${retries} failed:`, (err as Error).message || err);
      if (retries >= MAX_RETRIES) {
        console.error(`MongoDB: reached max retries (${MAX_RETRIES}). Throwing error.`);
        throw err;
      }
      console.info(`Retrying MongoDB connection in ${RETRY_MS}ms...`);
      await new Promise((res) => setTimeout(res, RETRY_MS));
      return attemptConnect();
    }
  }

  return attemptConnect();
}

/**
 * Close the mongoose connection gracefully.
 */
export async function disconnectDB(): Promise<void> {
  try {
    await mongoose.connection.close();
    console.info("MongoDB connection closed.");
  } catch (err) {
    console.error("Error while closing MongoDB connection:", (err as Error).message || err);
  }
}

/**
 * Utility: get the raw mongoose connection object.
 * Useful in modules that need to start transactions e.g. session = await getConnection().startSession()
 */
export function getConnection(): mongoose.Connection {
  return mongoose.connection;
}

/**
 * Ensure graceful shutdown on process signals.
 * Call this from server.ts after you import connectDB() if you want automatic handling.
 */
export function setupGracefulShutdown(): void {
  const shutdown = async (signal: string) => {
    console.info(`Received ${signal}. Closing MongoDB connection...`);
    try {
      await disconnectDB();
      console.info("Shutdown complete.");
      // allow process to exit normally
      process.exit(0);
    } catch (err) {
      console.error("Error during shutdown:", (err as Error).message || err);
      process.exit(1);
    }
  };

  process.on("SIGINT", () => shutdown("SIGINT"));
  process.on("SIGTERM", () => shutdown("SIGTERM"));
  // optional: listen for uncaught exceptions and unhandled rejections
  process.on("uncaughtException", (err) => {
    console.error("Uncaught Exception:", err);
    shutdown("uncaughtException");
  });
  process.on("unhandledRejection", (reason) => {
    console.error("Unhandled Rejection:", reason);
    shutdown("unhandledRejection");
  });
}
