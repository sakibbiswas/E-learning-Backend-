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
exports.removeStudent = exports.addStudentManually = exports.listUsers = exports.removePurchasedCourse = exports.addPurchasedCourse = exports.updateUserProfile = exports.getUserById = void 0;
const User_model_1 = require("../models/User.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const getUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return User_model_1.User.findById(id).select("-password").lean();
});
exports.getUserById = getUserById;
const updateUserProfile = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return User_model_1.User.findByIdAndUpdate(id, data, { new: true })
        .select("-password")
        .lean();
});
exports.updateUserProfile = updateUserProfile;
const addPurchasedCourse = (userId, courseId) => __awaiter(void 0, void 0, void 0, function* () {
    yield User_model_1.User.findByIdAndUpdate(userId, {
        $addToSet: { purchasedCourses: courseId },
    });
});
exports.addPurchasedCourse = addPurchasedCourse;
// ✅ Remove purchased course
const removePurchasedCourse = (userId, courseId) => __awaiter(void 0, void 0, void 0, function* () {
    yield User_model_1.User.findByIdAndUpdate(userId, {
        $pull: { purchasedCourses: courseId },
    });
});
exports.removePurchasedCourse = removePurchasedCourse;
const listUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    return User_model_1.User.find().select("-password").lean();
});
exports.listUsers = listUsers;
const addStudentManually = (name, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield User_model_1.User.findOne({ email });
    if (existingUser)
        throw new Error("User already exists");
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    const newUser = yield User_model_1.User.create({
        name,
        email,
        password: hashedPassword,
        role: "user",
        purchasedCourses: [],
    });
    return newUser.toObject();
});
exports.addStudentManually = addStudentManually;
const removeStudent = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedUser = yield User_model_1.User.findByIdAndDelete(userId);
    return deletedUser ? deletedUser.toObject() : null;
});
exports.removeStudent = removeStudent;
