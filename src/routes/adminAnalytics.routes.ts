import { Router } from "express";
import { getAdminAnalytics } from "../controllers/adminAnalytics.controller";
import { authMiddleware, adminMiddleware } from "../middlewares/auth.middleware";

const router = Router();

/**
 * @route GET /api/admin/analytics
 * @desc Get overall analytics (users, courses, payments, revenue)
 */
router.get("/", authMiddleware, adminMiddleware, getAdminAnalytics);

export default router;
