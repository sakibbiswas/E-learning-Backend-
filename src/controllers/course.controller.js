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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCourse = exports.updateCourse = exports.getCourseById = exports.getCourses = exports.createCourse = void 0;
const Course_model_1 = require("../models/Course.model");
// Create a course (Admin)
const createCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const course = yield Course_model_1.Course.create(req.body);
        res.status(201).json({ message: "Course created", course });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to create course", error });
    }
});
exports.createCourse = createCourse;
// Get all courses
const getCourses = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courses = yield Course_model_1.Course.find();
        res.json(courses);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch courses", error });
    }
});
exports.getCourses = getCourses;
// Get single course
const getCourseById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const course = yield Course_model_1.Course.findById(req.params.id);
        if (!course)
            return res.status(404).json({ message: "Course not found" });
        res.json(course);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch course", error });
    }
});
exports.getCourseById = getCourseById;
// Update a course (Admin)
const updateCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const course = yield Course_model_1.Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!course)
            return res.status(404).json({ message: "Course not found" });
        res.json({ message: "Course updated", course });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to update course", error });
    }
});
exports.updateCourse = updateCourse;
// Delete a course (Admin)
const deleteCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const course = yield Course_model_1.Course.findByIdAndDelete(req.params.id);
        if (!course)
            return res.status(404).json({ message: "Course not found" });
        res.json({ message: "Course deleted" });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to delete course", error });
    }
});
exports.deleteCourse = deleteCourse;
// import { Request, Response } from "express";
// import { Course } from "../models/Course.model";
// import path from "path";
// import fs from "fs";
// import multer from "multer";
// // ---------------- Multer Setup for Video Upload ----------------
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadDir = path.join(__dirname, "../../uploads/videos");
//     if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
//     cb(null, uploadDir);
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });
// export const uploadVideo = multer({ storage });
// // ---------------- Create a Course (Admin) ----------------
// export const createCourse = async (req: Request, res: Response) => {
//   try {
//     // Multer + FormData sends text fields as strings
//     const { title, description, price, modules } = req.body;
//     if (!title || !price) {
//       return res.status(400).json({ message: "Title and price are required" });
//     }
//     if (!req.user) return res.status(401).json({ message: "Unauthorized" });
//     const course = await Course.create({
//       title,
//       description,
//       price: Number(price),
//       modules: modules ? JSON.parse(modules) : [],
//       createdBy: req.user.id,
//     });
//     res.status(201).json({ message: "Course created", course });
//   } catch (error: any) {
//     console.error(error);
//     res.status(500).json({ message: "Failed to create course", error: error.message });
//   }
// };
// // ---------------- Get All Courses ----------------
// export const getCourses = async (req: Request, res: Response) => {
//   try {
//     const courses = await Course.find();
//     res.json({ courses });
//   } catch (error: any) {
//     console.error(error);
//     res.status(500).json({ message: "Failed to fetch courses", error: error.message });
//   }
// };
// // ---------------- Get Course By ID ----------------
// export const getCourseById = async (req: Request, res: Response) => {
//   try {
//     const course = await Course.findById(req.params.id);
//     if (!course) return res.status(404).json({ message: "Course not found" });
//     res.json({ course });
//   } catch (error: any) {
//     console.error(error);
//     res.status(500).json({ message: "Failed to fetch course", error: error.message });
//   }
// };
// // ---------------- Update a Course (Admin) ----------------
// export const updateCourse = async (req: Request, res: Response) => {
//   try {
//     const { title, description, price, modules } = req.body;
//     const course = await Course.findByIdAndUpdate(
//       req.params.id,
//       {
//         title,
//         description,
//         price: price ? Number(price) : undefined,
//         modules: modules ? JSON.parse(modules) : undefined,
//       },
//       { new: true }
//     );
//     if (!course) return res.status(404).json({ message: "Course not found" });
//     res.json({ message: "Course updated", course });
//   } catch (error: any) {
//     console.error(error);
//     res.status(500).json({ message: "Failed to update course", error: error.message });
//   }
// };
// // ---------------- Delete a Course (Admin) ----------------
// export const deleteCourse = async (req: Request, res: Response) => {
//   try {
//     const course = await Course.findByIdAndDelete(req.params.id);
//     if (!course) return res.status(404).json({ message: "Course not found" });
//     res.json({ message: "Course deleted" });
//   } catch (error: any) {
//     console.error(error);
//     res.status(500).json({ message: "Failed to delete course", error: error.message });
//   }
// };
// // ---------------- Upload Video for a Module/Class ----------------
// export const uploadCourseVideo = async (req: Request, res: Response) => {
//   try {
//     const { courseId, moduleIndex, classIndex } = req.body;
//     if (!req.file) return res.status(400).json({ message: "No video uploaded" });
//     const course = await Course.findById(courseId);
//     if (!course) return res.status(404).json({ message: "Course not found" });
//     // Ensure module and class exist
//     if (!course.modules[moduleIndex]) return res.status(400).json({ message: "Module not found" });
//     if (!course.modules[moduleIndex].classes[classIndex]) return res.status(400).json({ message: "Class not found" });
//     course.modules[moduleIndex].classes[classIndex].videoUrl = `/videos/${req.file.filename}`;
//     await course.save();
//     res.json({ message: "Video uploaded", course });
//   } catch (error: any) {
//     console.error(error);
//     res.status(500).json({ message: "Failed to upload video", error: error.message });
//   }
// };
