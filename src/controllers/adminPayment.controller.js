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
exports.deletePayment = exports.getAllPayments = void 0;
const adminPayment_service_1 = require("../services/adminPayment.service");
// import { listAllPayments, removePayment } from "../services/adminPayment.service";
// @desc Get all payments
const getAllPayments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payments = yield (0, adminPayment_service_1.listAllPayments)();
        res.json(payments);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch payments", error });
    }
});
exports.getAllPayments = getAllPayments;
// @desc Delete a payment
const deletePayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deletedPayment = yield (0, adminPayment_service_1.removePayment)(id);
        if (!deletedPayment) {
            return res.status(404).json({ message: "Payment not found" });
        }
        res.json({ message: "Payment deleted successfully", payment: deletedPayment });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to delete payment", error });
    }
});
exports.deletePayment = deletePayment;
