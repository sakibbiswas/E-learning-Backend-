"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
/**
 * @route GET /api/user/profile
 * @desc Get user profile
 */
router.get("/profile", auth_middleware_1.authMiddleware, user_controller_1.getProfile);
/**
 * @route PUT /api/user/profile
 * @desc Update user profile
 */
router.put("/profile", auth_middleware_1.authMiddleware, user_controller_1.updateProfile);
/**
 * @route GET /api/user/courses
 * @desc Get purchased courses
 */
router.get("/courses", auth_middleware_1.authMiddleware, user_controller_1.getPurchasedCourses);
/**
 * @route DELETE /api/user/courses/:courseId
 * @desc Remove purchased course
 */
router.delete("/courses/:courseId", auth_middleware_1.authMiddleware, user_controller_1.deletePurchasedCourse);
exports.default = router;
