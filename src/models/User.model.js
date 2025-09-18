"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
// backend/src/models/User.model.ts
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
    purchasedCourses: [
        { type: mongoose_1.Schema.Types.ObjectId, ref: "Course", default: [] },
    ],
}, { timestamps: true });
exports.User = (0, mongoose_1.model)("User", userSchema);
