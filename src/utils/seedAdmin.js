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
exports.seedAdmin = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const User_model_1 = require("../models/User.model");
const seedAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    const adminEmail = "admin@elearning.com";
    const existingAdmin = yield User_model_1.User.findOne({ email: adminEmail });
    if (existingAdmin)
        return;
    const hashedPassword = yield bcryptjs_1.default.hash("Admin@123", 10);
    yield User_model_1.User.create({
        name: "Super Admin",
        email: adminEmail,
        password: hashedPassword,
        role: "admin",
    });
    console.log("✅ Super Admin seeded");
});
exports.seedAdmin = seedAdmin;
