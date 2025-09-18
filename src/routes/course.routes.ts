// backend/src/routes/course.routes.ts
import { Router } from "express";
import {
  createCourse,
  getCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
} from "../controllers/course.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { adminMiddleware } from "../middlewares/role.middleware";


const router = Router();

/**
 * @route GET /api/course
 * @desc Get all courses
 */
router.get("/", getCourses);

/**
 * @route GET /api/course/:id
 * @desc Get single course
 */
router.get("/:id", getCourseById);

/**
 * @route POST /api/course
 * @desc Create a course (Admin only)
 */
router.post("/", authMiddleware, adminMiddleware, createCourse);

/**
 * @route PUT /api/course/:id
 * @desc Update a course (Admin only)
 */
router.put("/:id", authMiddleware, adminMiddleware, updateCourse);

/**
 * @route DELETE /api/course/:id
 * @desc Delete a course (Admin only)
 */
router.delete("/:id", authMiddleware, adminMiddleware, deleteCourse);

export default router;






















