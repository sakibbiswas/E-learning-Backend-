"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCourseById = exports.updateCourseById = exports.getCourseById = exports.getAllCourses = exports.createCourse = void 0;
// backend/src/services/course.service.ts
const Course_model_1 = require("../models/Course.model");
const createCourse = async (data) => {
    return Course_model_1.Course.create(data);
};
exports.createCourse = createCourse;
const getAllCourses = async () => {
    return Course_model_1.Course.find();
};
exports.getAllCourses = getAllCourses;
const getCourseById = async (id) => {
    return Course_model_1.Course.findById(id);
};
exports.getCourseById = getCourseById;
const updateCourseById = async (id, data) => {
    return Course_model_1.Course.findByIdAndUpdate(id, data, { new: true });
};
exports.updateCourseById = updateCourseById;
const deleteCourseById = async (id) => {
    return Course_model_1.Course.findByIdAndDelete(id);
};
exports.deleteCourseById = deleteCourseById;
