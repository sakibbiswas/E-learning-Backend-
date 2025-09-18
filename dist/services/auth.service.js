"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
// backend/src/services/auth.service.ts
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_model_1 = require("../models/User.model");
const JWT_SECRET = process.env.JWT_SECRET || "supersecret";
const registerUser = async (name, email, password) => {
    const existingUser = await User_model_1.User.findOne({ email });
    if (existingUser)
        throw new Error("User already exists");
    const hashedPassword = await bcryptjs_1.default.hash(password, 10);
    const user = await User_model_1.User.create({ name, email, password: hashedPassword });
    return user;
};
exports.registerUser = registerUser;
const loginUser = async (email, password) => {
    const user = await User_model_1.User.findOne({ email });
    if (!user)
        throw new Error("Invalid credentials");
    const isMatch = await bcryptjs_1.default.compare(password, user.password);
    if (!isMatch)
        throw new Error("Invalid credentials");
    const token = jsonwebtoken_1.default.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: "7d" });
    return { user, token };
};
exports.loginUser = loginUser;
