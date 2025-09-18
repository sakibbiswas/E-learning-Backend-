"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePayment = exports.getAllPayments = void 0;
const adminPayment_service_1 = require("../services/adminPayment.service");
// import { listAllPayments, removePayment } from "../services/adminPayment.service";
// @desc Get all payments
const getAllPayments = async (req, res) => {
    try {
        const payments = await (0, adminPayment_service_1.listAllPayments)();
        res.json(payments);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch payments", error });
    }
};
exports.getAllPayments = getAllPayments;
// @desc Delete a payment
const deletePayment = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPayment = await (0, adminPayment_service_1.removePayment)(id);
        if (!deletedPayment) {
            return res.status(404).json({ message: "Payment not found" });
        }
        res.json({ message: "Payment deleted successfully", payment: deletedPayment });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to delete payment", error });
    }
};
exports.deletePayment = deletePayment;
