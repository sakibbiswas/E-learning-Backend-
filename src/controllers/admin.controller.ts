
import { Request, Response } from "express";
import { addStudentManually, removeStudent } from "../services/user.service";
import { listUsersWithCourseCount, listRecentUsers } from "../services/admin.service";

// @desc Get all users with their purchased course count
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await listUsersWithCourseCount();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch users", error });
  }
};

// @desc Add a new student manually
export const addStudent = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newUser = await addStudentManually(name, email, password);
    res.status(201).json(newUser);
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Failed to add student" });
  }
};

// @desc Remove a student by ID
export const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedUser = await removeStudent(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Student removed successfully", user: deletedUser });
  } catch (error) {
    res.status(500).json({ message: "Failed to remove student", error });
  }
};

// @desc Get recent users
export const getRecentUsers = async (req: Request, res: Response) => {
  try {
    const users = await listRecentUsers(5);
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch recent users", error });
  }
};
