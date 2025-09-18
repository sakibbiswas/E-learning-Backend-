"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// backend/src/routes/course.routes.ts
const express_1 = require("express");
const course_controller_1 = require("../controllers/course.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const role_middleware_1 = require("../middlewares/role.middleware");
const router = (0, express_1.Router)();
/**
 * @route GET /api/course
 * @desc Get all courses
 */
router.get("/", course_controller_1.getCourses);
/**
 * @route GET /api/course/:id
 * @desc Get single course
 */
router.get("/:id", course_controller_1.getCourseById);
/**
 * @route POST /api/course
 * @desc Create a course (Admin only)
 */
router.post("/", auth_middleware_1.authMiddleware, role_middleware_1.adminMiddleware, course_controller_1.createCourse);
/**
 * @route PUT /api/course/:id
 * @desc Update a course (Admin only)
 */
router.put("/:id", auth_middleware_1.authMiddleware, role_middleware_1.adminMiddleware, course_controller_1.updateCourse);
/**
 * @route DELETE /api/course/:id
 * @desc Delete a course (Admin only)
 */
router.delete("/:id", auth_middleware_1.authMiddleware, role_middleware_1.adminMiddleware, course_controller_1.deleteCourse);
exports.default = router;
