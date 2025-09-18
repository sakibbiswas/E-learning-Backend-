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
exports.deletePurchasedCourse = exports.getPurchasedCourses = exports.updateProfile = exports.getProfile = void 0;
const User_model_1 = require("../models/User.model");
const user_service_1 = require("../services/user.service");
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const user = yield User_model_1.User.findById(userId).select("-password");
        if (!user)
            return res.status(404).json({ message: "User not found" });
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch profile", error });
    }
});
exports.getProfile = getProfile;
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const { name } = req.body;
        const user = yield User_model_1.User.findByIdAndUpdate(userId, { name }, { new: true }).select("-password");
        if (!user)
            return res.status(404).json({ message: "User not found" });
        res.json({ message: "Profile updated", user });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to update profile", error });
    }
});
exports.updateProfile = updateProfile;
const getPurchasedCourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const user = yield User_model_1.User.findById(userId).populate("purchasedCourses");
        if (!user)
            return res.status(404).json({ message: "User not found" });
        res.json(user.purchasedCourses);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch purchased courses", error });
    }
});
exports.getPurchasedCourses = getPurchasedCourses;
// ✅ Remove purchased course
const deletePurchasedCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const { courseId } = req.params;
        const user = yield User_model_1.User.findById(userId);
        if (!user)
            return res.status(404).json({ message: "User not found" });
        yield (0, user_service_1.removePurchasedCourse)(userId, courseId);
        res.json({ message: "Course removed successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to remove course", error });
    }
});
exports.deletePurchasedCourse = deletePurchasedCourse;
