"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handlePaymentFail = exports.handlePaymentSuccess = exports.initPayment = void 0;
const Payment_model_1 = require("../models/Payment.model");
const user_service_1 = require("./user.service");
const sslcommerz_config_1 = __importDefault(require("../config/sslcommerz.config"));
/**
 * Initialize a payment and return the Gateway URL
 */
const initPayment = async (userId, courseId, amount, customer) => {
    const transactionId = `TXN-${Date.now()}`;
    const payment = await Payment_model_1.Payment.create({
        userId,
        courseId,
        amount,
        method: "sslcommerz",
        status: "pending",
        transactionId,
    });
    const payload = sslcommerz_config_1.default.buildCreateSessionPayload({
        total_amount: amount,
        tran_id: transactionId,
        product_name: "Course",
        product_category: "Education",
        product_profile: "general",
        cus_name: customer.name,
        cus_email: customer.email,
        cus_phone: customer.phone || "01711111111",
        success_url: `${process.env.BASE_URL}/api/payment/success/${transactionId}`,
        fail_url: `${process.env.BASE_URL}/api/payment/fail/${transactionId}`,
        cancel_url: `${process.env.BASE_URL}/api/payment/cancel/${transactionId}`,
    });
    const response = (await sslcommerz_config_1.default.createSession(payload));
    if (!response.GatewayPageURL) {
        throw new Error(`Failed to initiate payment: ${response.failedreason || "Unknown error"}`);
    }
    return { transactionId, gatewayUrl: response.GatewayPageURL };
};
exports.initPayment = initPayment;
/**
 * Handle payment success
 */
const handlePaymentSuccess = async (transactionId) => {
    const payment = await Payment_model_1.Payment.findOneAndUpdate({ transactionId }, { status: "success" }, { new: true });
    if (!payment)
        throw new Error("Payment not found");
    await (0, user_service_1.addPurchasedCourse)(payment.userId.toString(), payment.courseId);
    return payment;
};
exports.handlePaymentSuccess = handlePaymentSuccess;
/**
 * Handle payment failure
 */
const handlePaymentFail = async (transactionId) => {
    const payment = await Payment_model_1.Payment.findOneAndUpdate({ transactionId }, { status: "failed" }, { new: true });
    if (!payment)
        throw new Error("Payment not found");
    return payment;
};
exports.handlePaymentFail = handlePaymentFail;
