"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment = void 0;
// backend/src/models/Payment.model.ts
const mongoose_1 = require("mongoose");
const paymentSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    courseId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Course", required: true },
    amount: { type: Number, required: true },
    method: {
        type: String,
        enum: ["sslcommerz"],
        default: "sslcommerz",
    },
    status: {
        type: String,
        enum: ["pending", "success", "failed"],
        default: "pending",
    },
    transactionId: { type: String, required: true },
    meta: { type: Object },
}, { timestamps: true });
exports.Payment = (0, mongoose_1.model)("Payment", paymentSchema);
