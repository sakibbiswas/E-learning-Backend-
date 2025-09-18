"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const payment_controller_1 = require("../controllers/payment.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
// Initialize payment
router.post("/init", auth_middleware_1.authMiddleware, payment_controller_1.initPayment);
// Success callback (SSLCommerz may POST)
router.route("/success/:transactionId")
    .get(payment_controller_1.paymentSuccess)
    .post(payment_controller_1.paymentSuccess);
// Fail callback
router.route("/fail/:transactionId")
    .get(payment_controller_1.paymentFail)
    .post(payment_controller_1.paymentFail);
// Cancel callback
router.route("/cancel/:transactionId")
    .get(payment_controller_1.paymentFail)
    .post(payment_controller_1.paymentFail);
exports.default = router;
