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
exports.fetchAdminAnalytics = void 0;
const User_model_1 = require("../models/User.model");
const Course_model_1 = require("../models/Course.model");
const Payment_model_1 = require("../models/Payment.model");
/**
 * Collect admin analytics data
 */
const fetchAdminAnalytics = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const totalUsers = yield User_model_1.User.countDocuments();
    const totalCourses = yield Course_model_1.Course.countDocuments();
    const totalPayments = yield Payment_model_1.Payment.countDocuments();
    const totalRevenueAgg = yield Payment_model_1.Payment.aggregate([
        { $match: { status: "success" } },
        { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    const totalRevenue = ((_a = totalRevenueAgg[0]) === null || _a === void 0 ? void 0 : _a.total) || 0;
    return {
        totalUsers,
        totalCourses,
        totalPayments,
        totalRevenue,
    };
});
exports.fetchAdminAnalytics = fetchAdminAnalytics;
