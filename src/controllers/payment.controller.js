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
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentFail = exports.paymentSuccess = exports.initPayment = void 0;
const Payment_model_1 = require("../models/Payment.model");
const User_model_1 = require("../models/User.model");
const Course_model_1 = require("../models/Course.model");
const sslcommerz_config_1 = require("../config/sslcommerz.config");
const initPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g;
    try {
        const { courseId } = req.body;
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.id;
        const course = yield Course_model_1.Course.findById(courseId);
        if (!course)
            return res.status(404).json({ message: "Course not found" });
        const transactionId = `TXN-${Date.now()}`;
        yield Payment_model_1.Payment.create({
            userId,
            courseId,
            amount: course.price,
            method: "sslcommerz",
            status: "pending",
            transactionId,
        });
        const paymentData = (0, sslcommerz_config_1.buildCreateSessionPayload)({
            total_amount: course.price,
            currency: "BDT",
            tran_id: transactionId,
            success_url: `${process.env.BASE_URL}/api/payment/success/${transactionId}`,
            fail_url: `${process.env.BASE_URL}/api/payment/fail/${transactionId}`,
            cancel_url: `${process.env.BASE_URL}/api/payment/cancel/${transactionId}`,
            product_name: course.title,
            product_category: "Course",
            product_profile: "general",
            cus_name: (_c = (_b = req.user) === null || _b === void 0 ? void 0 : _b.name) !== null && _c !== void 0 ? _c : "Unknown",
            cus_email: (_e = (_d = req.user) === null || _d === void 0 ? void 0 : _d.email) !== null && _e !== void 0 ? _e : "noemail@example.com",
            cus_add1: "Dhaka",
            cus_add2: "Dhaka",
            cus_city: "Dhaka",
            cus_state: "Dhaka",
            cus_postcode: "1207",
            cus_country: "Bangladesh",
            cus_phone: "01711111111",
            shipping_method: "NO",
            num_of_item: 1,
            ship_name: (_g = (_f = req.user) === null || _f === void 0 ? void 0 : _f.name) !== null && _g !== void 0 ? _g : "Unknown",
            ship_add1: "Dhaka",
            ship_city: "Dhaka",
            ship_country: "Bangladesh",
        });
        // ✅ Cast to SSLCommerzInitResponse
        const response = (yield (0, sslcommerz_config_1.createSession)(paymentData));
        if (response === null || response === void 0 ? void 0 : response.GatewayPageURL) {
            return res.json({ paymentUrl: response.GatewayPageURL });
        }
        else {
            console.error("SSLCommerz init error:", response);
            return res.status(400).json({ message: "Failed to initiate payment", response });
        }
    }
    catch (error) {
        console.error("Init payment error:", error);
        res.status(500).json({ message: "Payment initialization failed", error });
    }
});
exports.initPayment = initPayment;
const paymentSuccess = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { transactionId } = req.params;
        const payment = yield Payment_model_1.Payment.findOneAndUpdate({ transactionId }, { status: "success" }, { new: true });
        if (payment) {
            yield User_model_1.User.findByIdAndUpdate(payment.userId, {
                $addToSet: { purchasedCourses: payment.courseId },
            });
        }
        res.json({
            message: "Payment successful",
            transactionId,
            frontendRedirect: `${process.env.FRONTEND_URL}/dashboard`,
        });
    }
    catch (error) {
        console.error("Payment success error:", error);
        res.status(500).json({ message: "Payment success handling failed", error });
    }
});
exports.paymentSuccess = paymentSuccess;
const paymentFail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { transactionId } = req.params;
        yield Payment_model_1.Payment.findOneAndUpdate({ transactionId }, { status: "failed" });
        res.json({
            message: "Payment failed",
            transactionId,
            frontendRedirect: `${process.env.FRONTEND_URL}/payment-failed`,
        });
    }
    catch (error) {
        console.error("Payment fail error:", error);
        res.status(500).json({ message: "Payment fail handling failed", error });
    }
});
exports.paymentFail = paymentFail;
