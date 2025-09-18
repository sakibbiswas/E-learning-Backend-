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
exports.getRecentUsers = exports.deleteStudent = exports.addStudent = exports.getAllUsers = void 0;
const user_service_1 = require("../services/user.service");
const admin_service_1 = require("../services/admin.service");
// @desc Get all users with their purchased course count
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, admin_service_1.listUsersWithCourseCount)();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch users", error });
    }
});
exports.getAllUsers = getAllUsers;
// @desc Add a new student manually
const addStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const newUser = yield (0, user_service_1.addStudentManually)(name, email, password);
        res.status(201).json(newUser);
    }
    catch (error) {
        res.status(500).json({ message: error.message || "Failed to add student" });
    }
});
exports.addStudent = addStudent;
// @desc Remove a student by ID
const deleteStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedUser = yield (0, user_service_1.removeStudent)(id);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "Student removed successfully", user: deletedUser });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to remove student", error });
    }
});
exports.deleteStudent = deleteStudent;
// @desc Get recent users
const getRecentUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, admin_service_1.listRecentUsers)(5);
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch recent users", error });
    }
});
exports.getRecentUsers = getRecentUsers;
