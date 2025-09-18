import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { connectDB } from "./config/db";
import { seedAdmin } from "./utils/seedAdmin";

const PORT = process.env.PORT || 5000;

connectDB()
  .then(async () => {
    console.log("MongoDB connected");
    await seedAdmin(); // Auto-create admin if not exists
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
