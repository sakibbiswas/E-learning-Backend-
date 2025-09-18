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
exports.listRecentUsers = exports.listUsersWithCourseCount = void 0;
const User_model_1 = require("../models/User.model");
/**
 * List all users with their purchased courses count
 */
const listUsersWithCourseCount = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield User_model_1.User.find().select("name email purchasedCourses").lean();
    return users.map((user) => {
        var _a;
        return ({
            _id: user._id.toString(),
            name: user.name,
            email: user.email,
            purchasedCoursesCount: ((_a = user.purchasedCourses) === null || _a === void 0 ? void 0 : _a.length) || 0,
        });
    });
});
exports.listUsersWithCourseCount = listUsersWithCourseCount;
/**
 * List recent users
 */
const listRecentUsers = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (limit = 5) {
    const users = yield User_model_1.User.find()
        .sort({ createdAt: -1 })
        .limit(limit)
        .select("name email purchasedCourses")
        .lean();
    return users.map((user) => {
        var _a;
        return ({
            _id: user._id.toString(),
            name: user.name,
            email: user.email,
            purchasedCoursesCount: ((_a = user.purchasedCourses) === null || _a === void 0 ? void 0 : _a.length) || 0,
        });
    });
});
exports.listRecentUsers = listRecentUsers;
