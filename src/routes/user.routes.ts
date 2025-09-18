


import { Router } from "express";
import {
  getProfile,
  updateProfile,
  getPurchasedCourses,
  deletePurchasedCourse,
} from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

/**
 * @route GET /api/user/profile
 * @desc Get user profile
 */
router.get("/profile", authMiddleware, getProfile);

/**
 * @route PUT /api/user/profile
 * @desc Update user profile
 */
router.put("/profile", authMiddleware, updateProfile);

/**
 * @route GET /api/user/courses
 * @desc Get purchased courses
 */
router.get("/courses", authMiddleware, getPurchasedCourses);

/**
 * @route DELETE /api/user/courses/:courseId
 * @desc Remove purchased course
 */
router.delete("/courses/:courseId", authMiddleware, deletePurchasedCourse);

export default router;
