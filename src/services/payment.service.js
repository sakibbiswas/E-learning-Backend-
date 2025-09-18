"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const initPayment = (userId, courseId, amount, customer) => __awaiter(void 0, void 0, void 0, function* () {
    const transactionId = `TXN-${Date.now()}`;
    const payment = yield Payment_model_1.Payment.create({
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
    const response = (yield sslcommerz_config_1.default.createSession(payload));
    if (!response.GatewayPageURL) {
        throw new Error(`Failed to initiate payment: ${response.failedreason || "Unknown error"}`);
    }
    return { transactionId, gatewayUrl: response.GatewayPageURL };
});
exports.initPayment = initPayment;
/**
 * Handle payment success
 */
const handlePaymentSuccess = (transactionId) => __awaiter(void 0, void 0, void 0, function* () {
    const payment = yield Payment_model_1.Payment.findOneAndUpdate({ transactionId }, { status: "success" }, { new: true });
    if (!payment)
        throw new Error("Payment not found");
    yield (0, user_service_1.addPurchasedCourse)(payment.userId.toString(), payment.courseId);
    return payment;
});
exports.handlePaymentSuccess = handlePaymentSuccess;
/**
 * Handle payment failure
 */
const handlePaymentFail = (transactionId) => __awaiter(void 0, void 0, void 0, function* () {
    const payment = yield Payment_model_1.Payment.findOneAndUpdate({ transactionId }, { status: "failed" }, { new: true });
    if (!payment)
        throw new Error("Payment not found");
    return payment;
});
exports.handlePaymentFail = handlePaymentFail;
