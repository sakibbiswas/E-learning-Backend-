

import { Router } from "express";
import {
  initPayment,
  paymentSuccess,
  paymentFail,
} from "../controllers/payment.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

// Initialize payment
router.post("/init", authMiddleware, initPayment);

// Success callback (SSLCommerz may POST)
router.route("/success/:transactionId")
  .get(paymentSuccess)
  .post(paymentSuccess);

// Fail callback
router.route("/fail/:transactionId")
  .get(paymentFail)
  .post(paymentFail);

// Cancel callback
router.route("/cancel/:transactionId")
  .get(paymentFail)
  .post(paymentFail);

export default router;































