import { Router } from "express";
// import { getAllPayments, deletePayment } from "../controllers/adminPayment.controller";
import { authMiddleware, adminMiddleware } from "../middlewares/auth.middleware";
import { deletePayment, getAllPayments } from "../controllers/adminPayment.controller";

const router = Router();

/**
 * @route GET /api/admin/payments
 * @desc Get all payments
 */
router.get("/", authMiddleware, adminMiddleware, getAllPayments);

/**
 * @route DELETE /api/admin/payments/:id
 * @desc Delete a payment
 */
router.delete("/:id", authMiddleware, adminMiddleware, deletePayment);

export default router;
