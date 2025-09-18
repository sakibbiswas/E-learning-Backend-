"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminAnalytics_controller_1 = require("../controllers/adminAnalytics.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
/**
 * @route GET /api/admin/analytics
 * @desc Get overall analytics (users, courses, payments, revenue)
 */
router.get("/", auth_middleware_1.authMiddleware, auth_middleware_1.adminMiddleware, adminAnalytics_controller_1.getAdminAnalytics);
exports.default = router;
