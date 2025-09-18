"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// import { getAllPayments, deletePayment } from "../controllers/adminPayment.controller";
const auth_middleware_1 = require("../middlewares/auth.middleware");
const adminPayment_controller_1 = require("../controllers/adminPayment.controller");
const router = (0, express_1.Router)();
/**
 * @route GET /api/admin/payments
 * @desc Get all payments
 */
router.get("/", auth_middleware_1.authMiddleware, auth_middleware_1.adminMiddleware, adminPayment_controller_1.getAllPayments);
/**
 * @route DELETE /api/admin/payments/:id
 * @desc Delete a payment
 */
router.delete("/:id", auth_middleware_1.authMiddleware, auth_middleware_1.adminMiddleware, adminPayment_controller_1.deletePayment);
exports.default = router;
