


import { User, IUser } from "../models/User.model";
import { Types } from "mongoose";
import bcrypt from "bcryptjs";

export const getUserById = async (id: string): Promise<IUser | null> => {
  return User.findById(id).select("-password").lean<IUser | null>();
};

export const updateUserProfile = async (
  id: string,
  data: Partial<IUser>
): Promise<IUser | null> => {
  return User.findByIdAndUpdate(id, data, { new: true })
    .select("-password")
    .lean<IUser | null>();
};

export const addPurchasedCourse = async (
  userId: string,
  courseId: Types.ObjectId
): Promise<void> => {
  await User.findByIdAndUpdate(userId, {
    $addToSet: { purchasedCourses: courseId },
  });
};

// ✅ Remove purchased course
export const removePurchasedCourse = async (
  userId: string,
  courseId: string
): Promise<void> => {
  await User.findByIdAndUpdate(userId, {
    $pull: { purchasedCourses: courseId },
  });
};

export const listUsers = async (): Promise<IUser[]> => {
  return User.find().select("-password").lean<IUser[]>();
};

export const addStudentManually = async (
  name: string,
  email: string,
  password: string
): Promise<IUser> => {
  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    role: "user",
    purchasedCourses: [],
  });

  return newUser.toObject() as IUser;
};

export const removeStudent = async (userId: string): Promise<IUser | null> => {
  const deletedUser = await User.findByIdAndDelete(userId);
  return deletedUser ? (deletedUser.toObject() as IUser) : null;
};
