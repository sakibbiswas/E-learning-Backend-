"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAdminAnalytics = void 0;
const User_model_1 = require("../models/User.model");
const Course_model_1 = require("../models/Course.model");
const Payment_model_1 = require("../models/Payment.model");
/**
 * Collect admin analytics data
 */
const fetchAdminAnalytics = async () => {
    const totalUsers = await User_model_1.User.countDocuments();
    const totalCourses = await Course_model_1.Course.countDocuments();
    const totalPayments = await Payment_model_1.Payment.countDocuments();
    const totalRevenueAgg = await Payment_model_1.Payment.aggregate([
        { $match: { status: "success" } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    const totalRevenue = totalRevenueAgg[0]?.total || 0;
    return {
        totalUsers,
        totalCourses,
        totalPayments,
        totalRevenue,
    };
};
exports.fetchAdminAnalytics = fetchAdminAnalytics;
