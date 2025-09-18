"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const admin_controller_1 = require("../controllers/admin.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
/**
 * @route GET /api/admin/users
 * @desc Get all users with purchased courses count
 */
router.get("/users", auth_middleware_1.authMiddleware, auth_middleware_1.adminMiddleware, admin_controller_1.getAllUsers);
/**
 * @route GET /api/admin/users/recent
 * @desc Get recent users
 */
router.get("/users/recent", auth_middleware_1.authMiddleware, auth_middleware_1.adminMiddleware, admin_controller_1.getRecentUsers);
/**
 * @route POST /api/admin/users
 * @desc Add student manually
 */
router.post("/users", auth_middleware_1.authMiddleware, auth_middleware_1.adminMiddleware, admin_controller_1.addStudent);
/**
 * @route DELETE /api/admin/users/:id
 * @desc Remove student
 */
router.delete("/users/:id", auth_middleware_1.authMiddleware, auth_middleware_1.adminMiddleware, admin_controller_1.deleteStudent);
exports.default = router;
