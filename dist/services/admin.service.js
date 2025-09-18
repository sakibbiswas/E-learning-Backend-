"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listRecentUsers = exports.listUsersWithCourseCount = void 0;
const User_model_1 = require("../models/User.model");
/**
 * List all users with their purchased courses count
 */
const listUsersWithCourseCount = async () => {
    const users = await User_model_1.User.find().select("name email purchasedCourses").lean();
    return users.map((user) => ({
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
        purchasedCoursesCount: user.purchasedCourses?.length || 0,
    }));
};
exports.listUsersWithCourseCount = listUsersWithCourseCount;
/**
 * List recent users
 */
const listRecentUsers = async (limit = 5) => {
    const users = await User_model_1.User.find()
        .sort({ createdAt: -1 })
        .limit(limit)
        .select("name email purchasedCourses")
        .lean();
    return users.map((user) => ({
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
        purchasedCoursesCount: user.purchasedCourses?.length || 0,
    }));
};
exports.listRecentUsers = listRecentUsers;
