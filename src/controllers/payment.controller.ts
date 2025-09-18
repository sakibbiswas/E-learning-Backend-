
import { Request, Response } from "express";
import { Payment } from "../models/Payment.model";
import { User } from "../models/User.model";
import { Course } from "../models/Course.model";
import { buildCreateSessionPayload, createSession } from "../config/sslcommerz.config";

interface AuthRequest extends Request {
  user?: {
    id: string;
    role: "user" | "admin";
    name?: string;
    email?: string;
  };
}

// Define the type of SSLCommerz session response
interface SSLCommerzInitResponse {
  status: string;
  failedreason?: string;
  sessionkey?: string;
  GatewayPageURL?: string;
  storeBanner?: string;
  storeLogo?: string;
  tranId?: string;
}

export const initPayment = async (req: AuthRequest, res: Response) => {
  try {
    const { courseId } = req.body;
    const userId = req.user?.id;

    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    const transactionId = `TXN-${Date.now()}`;

    await Payment.create({
      userId,
      courseId,
      amount: course.price,
      method: "sslcommerz",
      status: "pending",
      transactionId,
    });

    const paymentData = buildCreateSessionPayload({
      total_amount: course.price,
      currency: "BDT",
      tran_id: transactionId,
      success_url: `${process.env.BASE_URL}/api/payment/success/${transactionId}`,
      fail_url: `${process.env.BASE_URL}/api/payment/fail/${transactionId}`,
      cancel_url: `${process.env.BASE_URL}/api/payment/cancel/${transactionId}`,
      product_name: course.title,
      product_category: "Course",
      product_profile: "general",
      cus_name: req.user?.name ?? "Unknown",
      cus_email: req.user?.email ?? "noemail@example.com",
      cus_add1: "Dhaka",
      cus_add2: "Dhaka",
      cus_city: "Dhaka",
      cus_state: "Dhaka",
      cus_postcode: "1207",
      cus_country: "Bangladesh",
      cus_phone: "01711111111",
      shipping_method: "NO",
      num_of_item: 1,
      ship_name: req.user?.name ?? "Unknown",
      ship_add1: "Dhaka",
      ship_city: "Dhaka",
      ship_country: "Bangladesh",
    });

    // ✅ Cast to SSLCommerzInitResponse
    const response = (await createSession(paymentData)) as SSLCommerzInitResponse;

    if (response?.GatewayPageURL) {
      return res.json({ paymentUrl: response.GatewayPageURL });
    } else {
      console.error("SSLCommerz init error:", response);
      return res.status(400).json({ message: "Failed to initiate payment", response });
    }
  } catch (error) {
    console.error("Init payment error:", error);
    res.status(500).json({ message: "Payment initialization failed", error });
  }
};

export const paymentSuccess = async (req: Request, res: Response) => {
  try {
    const { transactionId } = req.params;
    const payment = await Payment.findOneAndUpdate(
      { transactionId },
      { status: "success" },
      { new: true }
    );

    if (payment) {
      await User.findByIdAndUpdate(payment.userId, {
        $addToSet: { purchasedCourses: payment.courseId },
      });
    }

    res.json({
      message: "Payment successful",
      transactionId,
      frontendRedirect: `${process.env.FRONTEND_URL}/dashboard`,
    });
  } catch (error) {
    console.error("Payment success error:", error);
    res.status(500).json({ message: "Payment success handling failed", error });
  }
};

export const paymentFail = async (req: Request, res: Response) => {
  try {
    const { transactionId } = req.params;
    await Payment.findOneAndUpdate({ transactionId }, { status: "failed" });

    res.json({
      message: "Payment failed",
      transactionId,
      frontendRedirect: `${process.env.FRONTEND_URL}/payment-failed`,
    });
  } catch (error) {
    console.error("Payment fail error:", error);
    res.status(500).json({ message: "Payment fail handling failed", error });
  }
};
