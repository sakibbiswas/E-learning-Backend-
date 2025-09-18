

import { Request, Response } from "express";
import { User } from "../models/User.model";
import { Course } from "../models/Course.model";
import { removePurchasedCourse } from "../services/user.service";

export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const user = await User.findById(userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch profile", error });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { name } = req.body;

    const user = await User.findByIdAndUpdate(userId, { name }, { new: true }).select(
      "-password"
    );
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ message: "Profile updated", user });
  } catch (error) {
    res.status(500).json({ message: "Failed to update profile", error });
  }
};

export const getPurchasedCourses = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const user = await User.findById(userId).populate("purchasedCourses");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user.purchasedCourses);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch purchased courses", error });
  }
};

// ✅ Remove purchased course
export const deletePurchasedCourse = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { courseId } = req.params;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    await removePurchasedCourse(userId!, courseId);

    res.json({ message: "Course removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to remove course", error });
  }
};
