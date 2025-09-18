// backend/src/models/Payment.model.ts
import { Schema, model, Document, Types } from "mongoose";

export type PaymentStatus = "pending" | "success" | "failed";
export type PaymentMethod = "sslcommerz";

export interface IPayment extends Document {
  userId: Types.ObjectId;
  courseId: Types.ObjectId;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  transactionId: string;
  meta?: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

const paymentSchema = new Schema<IPayment>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    courseId: { type: Schema.Types.ObjectId, ref: "Course", required: true },
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
  },
  { timestamps: true }
);

export const Payment = model<IPayment>("Payment", paymentSchema);






























