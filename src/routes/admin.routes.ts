import { Router } from "express";
import {
  getAllUsers,
  addStudent,
  deleteStudent,
  getRecentUsers,
} from "../controllers/admin.controller";
import { authMiddleware, adminMiddleware } from "../middlewares/auth.middleware";

const router = Router();

/**
 * @route GET /api/admin/users
 * @desc Get all users with purchased courses count
 */
router.get("/users", authMiddleware, adminMiddleware, getAllUsers);

/**
 * @route GET /api/admin/users/recent
 * @desc Get recent users
 */
router.get("/users/recent", authMiddleware, adminMiddleware, getRecentUsers);

/**
 * @route POST /api/admin/users
 * @desc Add student manually
 */
router.post("/users", authMiddleware, adminMiddleware, addStudent);

/**
 * @route DELETE /api/admin/users/:id
 * @desc Remove student
 */
router.delete("/users/:id", authMiddleware, adminMiddleware, deleteStudent);

export default router;
