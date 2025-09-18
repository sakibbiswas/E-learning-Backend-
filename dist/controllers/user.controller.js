"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePurchasedCourse = exports.getPurchasedCourses = exports.updateProfile = exports.getProfile = void 0;
const User_model_1 = require("../models/User.model");
const user_service_1 = require("../services/user.service");
const getProfile = async (req, res) => {
    try {
        const userId = req.user?.id;
        const user = await User_model_1.User.findById(userId).select("-password");
        if (!user)
            return res.status(404).json({ message: "User not found" });
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch profile", error });
    }
};
exports.getProfile = getProfile;
const updateProfile = async (req, res) => {
    try {
        const userId = req.user?.id;
        const { name } = req.body;
        const user = await User_model_1.User.findByIdAndUpdate(userId, { name }, { new: true }).select("-password");
        if (!user)
            return res.status(404).json({ message: "User not found" });
        res.json({ message: "Profile updated", user });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to update profile", error });
    }
};
exports.updateProfile = updateProfile;
const getPurchasedCourses = async (req, res) => {
    try {
        const userId = req.user?.id;
        const user = await User_model_1.User.findById(userId).populate("purchasedCourses");
        if (!user)
            return res.status(404).json({ message: "User not found" });
        res.json(user.purchasedCourses);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch purchased courses", error });
    }
};
exports.getPurchasedCourses = getPurchasedCourses;
// ✅ Remove purchased course
const deletePurchasedCourse = async (req, res) => {
    try {
        const userId = req.user?.id;
        const { courseId } = req.params;
        const user = await User_model_1.User.findById(userId);
        if (!user)
            return res.status(404).json({ message: "User not found" });
        await (0, user_service_1.removePurchasedCourse)(userId, courseId);
        res.json({ message: "Course removed successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to remove course", error });
    }
};
exports.deletePurchasedCourse = deletePurchasedCourse;
