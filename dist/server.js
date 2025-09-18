"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app_1 = __importDefault(require("./app"));
const db_1 = require("./config/db");
const seedAdmin_1 = require("./utils/seedAdmin");
const PORT = process.env.PORT || 5000;
(0, db_1.connectDB)()
    .then(async () => {
    console.log("MongoDB connected");
    await (0, seedAdmin_1.seedAdmin)(); // Auto-create admin if not exists
})
    .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
});
app_1.default.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
