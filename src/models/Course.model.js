"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Course = void 0;
// backend/src/models/Course.model.ts
const mongoose_1 = require("mongoose");
const classSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    videoUrl: { type: String, required: true },
}, { _id: false });
const moduleSchema = new mongoose_1.Schema({
    moduleTitle: { type: String, required: true },
    classes: { type: [classSchema], default: [] },
}, { _id: false });
const courseSchema = new mongoose_1.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    price: { type: Number, required: true },
    modules: { type: [moduleSchema], default: [] },
    createdBy: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });
exports.Course = (0, mongoose_1.model)("Course", courseSchema);
