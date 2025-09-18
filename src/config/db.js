"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = connectDB;
exports.disconnectDB = disconnectDB;
exports.getConnection = getConnection;
exports.setupGracefulShutdown = setupGracefulShutdown;
// backend/src/config/db.ts
const mongoose_1 = __importDefault(require("mongoose"));
const { MONGO_URI = "", MONGO_CONNECT_RETRY_MS = "2000", MONGO_CONNECT_MAX_RETRIES = "5", NODE_ENV = "development", } = process.env;
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
function connectDB() {
    return __awaiter(this, void 0, void 0, function* () {
        const options = {
            // modern mongoose defaults (some keys optional depending on mongoose version)
            // useUnifiedTopology & useNewUrlParser are default in modern mongoose but kept for clarity
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // autoIndex: NODE_ENV !== "production", // optional
        };
        function attemptConnect() {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    yield mongoose_1.default.connect(MONGO_URI, options);
                    console.info("MongoDB connected.");
                    // optional: show DB name
                    // @ts-ignore
                    console.info(`MongoDB host: ${mongoose_1.default.connection.host}, db: ${mongoose_1.default.connection.name}`);
                    return mongoose_1.default;
                }
                catch (err) {
                    retries += 1;
                    console.error(`MongoDB connection attempt ${retries} failed:`, err.message || err);
                    if (retries >= MAX_RETRIES) {
                        console.error(`MongoDB: reached max retries (${MAX_RETRIES}). Throwing error.`);
                        throw err;
                    }
                    console.info(`Retrying MongoDB connection in ${RETRY_MS}ms...`);
                    yield new Promise((res) => setTimeout(res, RETRY_MS));
                    return attemptConnect();
                }
            });
        }
        return attemptConnect();
    });
}
/**
 * Close the mongoose connection gracefully.
 */
function disconnectDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connection.close();
            console.info("MongoDB connection closed.");
        }
        catch (err) {
            console.error("Error while closing MongoDB connection:", err.message || err);
        }
    });
}
/**
 * Utility: get the raw mongoose connection object.
 * Useful in modules that need to start transactions e.g. session = await getConnection().startSession()
 */
function getConnection() {
    return mongoose_1.default.connection;
}
/**
 * Ensure graceful shutdown on process signals.
 * Call this from server.ts after you import connectDB() if you want automatic handling.
 */
function setupGracefulShutdown() {
    const shutdown = (signal) => __awaiter(this, void 0, void 0, function* () {
        console.info(`Received ${signal}. Closing MongoDB connection...`);
        try {
            yield disconnectDB();
            console.info("Shutdown complete.");
            // allow process to exit normally
            process.exit(0);
        }
        catch (err) {
            console.error("Error during shutdown:", err.message || err);
            process.exit(1);
        }
    });
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
