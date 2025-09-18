import { Payment, IPayment } from "../models/Payment.model";
import { addPurchasedCourse } from "./user.service";
import { Types } from "mongoose";
import sslcommerzConfig from "../config/sslcommerz.config";

/**
 * Type for SSLCommerz session creation response
 */
interface SSLCommerzInitResponse {
  status: string;
  failedreason?: string;
  sessionkey?: string;
  GatewayPageURL: string;
  storeBanner?: string;
  storeLogo?: string;
  tranId?: string;
}

/**
 * Initialize a payment and return the Gateway URL
 */
export const initPayment = async (
  userId: string,
  courseId: Types.ObjectId,
  amount: number,
  customer: { name: string; email: string; phone?: string }
): Promise<{ transactionId: string; gatewayUrl: string }> => {
  const transactionId = `TXN-${Date.now()}`;

  const payment = await Payment.create({
    userId,
    courseId,
    amount,
    method: "sslcommerz",
    status: "pending",
    transactionId,
  });

  const payload = sslcommerzConfig.buildCreateSessionPayload({
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

  const response = (await sslcommerzConfig.createSession(
    payload
  )) as SSLCommerzInitResponse;

  if (!response.GatewayPageURL) {
    throw new Error(
      `Failed to initiate payment: ${response.failedreason || "Unknown error"}`
    );
  }

  return { transactionId, gatewayUrl: response.GatewayPageURL };
};

/**
 * Handle payment success
 */
export const handlePaymentSuccess = async (transactionId: string) => {
  const payment = await Payment.findOneAndUpdate(
    { transactionId },
    { status: "success" },
    { new: true }
  );
  if (!payment) throw new Error("Payment not found");

  await addPurchasedCourse(payment.userId.toString(), payment.courseId);
  return payment;
};

/**
 * Handle payment failure
 */
export const handlePaymentFail = async (transactionId: string) => {
  const payment = await Payment.findOneAndUpdate(
    { transactionId },
    { status: "failed" },
    { new: true }
  );
  if (!payment) throw new Error("Payment not found");

  return payment;
};















































