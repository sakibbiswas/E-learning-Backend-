import { User } from "../models/User.model";
import { Course } from "../models/Course.model";
import { Payment } from "../models/Payment.model";

/**
 * Collect admin analytics data
 */
export const fetchAdminAnalytics = async () => {
  const totalUsers = await User.countDocuments();
  const totalCourses = await Course.countDocuments();
  const totalPayments = await Payment.countDocuments();
  const totalRevenueAgg = await Payment.aggregate([
    { $match: { status: "success" } },
    { $group: { _id: null, total: { $sum: "$amount" } } },
  ]);

  const totalRevenue = totalRevenueAgg[0]?.total || 0;

  return {
    totalUsers,
    totalCourses,
    totalPayments,
    totalRevenue,
  };
};
