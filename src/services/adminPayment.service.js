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
exports.removePayment = exports.listAllPayments = void 0;
const Payment_model_1 = require("../models/Payment.model");
/**
 * List all payments with user + course info
 */
const listAllPayments = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield Payment_model_1.Payment.find()
        .populate("userId", "name email")
        .populate("courseId", "title price")
        .sort({ createdAt: -1 })
        .lean();
});
exports.listAllPayments = listAllPayments;
/**
 * Delete a payment by ID
 */
const removePayment = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Payment_model_1.Payment.findByIdAndDelete(id);
});
exports.removePayment = removePayment;
