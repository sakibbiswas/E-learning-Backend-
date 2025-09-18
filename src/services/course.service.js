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
exports.deleteCourseById = exports.updateCourseById = exports.getCourseById = exports.getAllCourses = exports.createCourse = void 0;
// backend/src/services/course.service.ts
const Course_model_1 = require("../models/Course.model");
const createCourse = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return Course_model_1.Course.create(data);
});
exports.createCourse = createCourse;
const getAllCourses = () => __awaiter(void 0, void 0, void 0, function* () {
    return Course_model_1.Course.find();
});
exports.getAllCourses = getAllCourses;
const getCourseById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return Course_model_1.Course.findById(id);
});
exports.getCourseById = getCourseById;
const updateCourseById = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return Course_model_1.Course.findByIdAndUpdate(id, data, { new: true });
});
exports.updateCourseById = updateCourseById;
const deleteCourseById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return Course_model_1.Course.findByIdAndDelete(id);
});
exports.deleteCourseById = deleteCourseById;
