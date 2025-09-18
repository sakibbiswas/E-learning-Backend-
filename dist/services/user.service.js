"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeStudent = exports.addStudentManually = exports.listUsers = exports.removePurchasedCourse = exports.addPurchasedCourse = exports.updateUserProfile = exports.getUserById = void 0;
const User_model_1 = require("../models/User.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const getUserById = async (id) => {
    return User_model_1.User.findById(id).select("-password").lean();
};
exports.getUserById = getUserById;
const updateUserProfile = async (id, data) => {
    return User_model_1.User.findByIdAndUpdate(id, data, { new: true })
        .select("-password")
        .lean();
};
exports.updateUserProfile = updateUserProfile;
const addPurchasedCourse = async (userId, courseId) => {
    await User_model_1.User.findByIdAndUpdate(userId, {
        $addToSet: { purchasedCourses: courseId },
    });
};
exports.addPurchasedCourse = addPurchasedCourse;
// ✅ Remove purchased course
const removePurchasedCourse = async (userId, courseId) => {
    await User_model_1.User.findByIdAndUpdate(userId, {
        $pull: { purchasedCourses: courseId },
    });
};
exports.removePurchasedCourse = removePurchasedCourse;
const listUsers = async () => {
    return User_model_1.User.find().select("-password").lean();
};
exports.listUsers = listUsers;
const addStudentManually = async (name, email, password) => {
    const existingUser = await User_model_1.User.findOne({ email });
    if (existingUser)
        throw new Error("User already exists");
    const hashedPassword = await bcryptjs_1.default.hash(password, 10);
    const newUser = await User_model_1.User.create({
        name,
        email,
        password: hashedPassword,
        role: "user",
        purchasedCourses: [],
    });
    return newUser.toObject();
};
exports.addStudentManually = addStudentManually;
const removeStudent = async (userId) => {
    const deletedUser = await User_model_1.User.findByIdAndDelete(userId);
    return deletedUser ? deletedUser.toObject() : null;
};
exports.removeStudent = removeStudent;
