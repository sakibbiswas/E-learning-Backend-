import { Payment } from "../models/Payment.model";

/**
 * List all payments with user + course info
 */
export const listAllPayments = async () => {
  return await Payment.find()
    .populate("userId", "name email")
    .populate("courseId", "title price")
    .sort({ createdAt: -1 })
    .lean();
};

/**
 * Delete a payment by ID
 */
export const removePayment = async (id: string) => {
  return await Payment.findByIdAndDelete(id);
};
