import { Request, Response } from "express";
import { listAllPayments, removePayment } from "../services/adminPayment.service";
// import { listAllPayments, removePayment } from "../services/adminPayment.service";

// @desc Get all payments
export const getAllPayments = async (req: Request, res: Response) => {
  try {
    const payments = await listAllPayments();
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch payments", error });
  }
};

// @desc Delete a payment
export const deletePayment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedPayment = await removePayment(id);

    if (!deletedPayment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    res.json({ message: "Payment deleted successfully", payment: deletedPayment });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete payment", error });
  }
};
