"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedAdmin = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_model_1 = require("../models/User.model");
const seedAdmin = async () => {
    const adminEmail = "admin@elearning.com";
    const existingAdmin = await User_model_1.User.findOne({ email: adminEmail });
    if (existingAdmin)
        return;
    const hashedPassword = await bcryptjs_1.default.hash("Admin@123", 10);
    await User_model_1.User.create({
        name: "Super Admin",
        email: adminEmail,
        password: hashedPassword,
        role: "admin",
    });
    console.log("✅ Super Admin seeded");
};
exports.seedAdmin = seedAdmin;
