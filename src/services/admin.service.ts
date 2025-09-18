import { User, IUser } from "../models/User.model";

/**
 * List all users with their purchased courses count
 */
export const listUsersWithCourseCount = async (): Promise<
  { _id: string; name: string; email: string; purchasedCoursesCount: number }[]
> => {
  const users = await User.find().select("name email purchasedCourses").lean<IUser[]>();

  return users.map((user) => ({
    _id: user._id.toString(),
    name: user.name,
    email: user.email,
    purchasedCoursesCount: user.purchasedCourses?.length || 0,
  }));
};

/**
 * List recent users
 */
export const listRecentUsers = async (limit = 5): Promise<
  { _id: string; name: string; email: string; purchasedCoursesCount: number }[]
> => {
  const users = await User.find()
    .sort({ createdAt: -1 })
    .limit(limit)
    .select("name email purchasedCourses")
    .lean<IUser[]>();

  return users.map((user) => ({
    _id: user._id.toString(),
    name: user.name,
    email: user.email,
    purchasedCoursesCount: user.purchasedCourses?.length || 0,
  }));
};
