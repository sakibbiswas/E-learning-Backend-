import { Request, Response } from "express";
import { fetchAdminAnalytics } from "../services/adminAnalytics.service";

export const getAdminAnalytics = async (req: Request, res: Response) => {
  try {
    const analytics = await fetchAdminAnalytics();
    res.json(analytics);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch analytics", error });
  }
};
