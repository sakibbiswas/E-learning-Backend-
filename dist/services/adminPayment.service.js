"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removePayment = exports.listAllPayments = void 0;
const Payment_model_1 = require("../models/Payment.model");
/**
 * List all payments with user + course info
 */
const listAllPayments = async () => {
    return await Payment_model_1.Payment.find()
        .populate("userId", "name email")
        .populate("courseId", "title price")
        .sort({ createdAt: -1 })
        .lean();
};
exports.listAllPayments = listAllPayments;
/**
 * Delete a payment by ID
 */
const removePayment = async (id) => {
    return await Payment_model_1.Payment.findByIdAndDelete(id);
};
exports.removePayment = removePayment;
