// backend/src/services/course.service.ts
import { Course, ICourse } from "../models/Course.model";

export const createCourse = async (data: Partial<ICourse>): Promise<ICourse> => {
  return Course.create(data);
};

export const getAllCourses = async (): Promise<ICourse[]> => {
  return Course.find();
};

export const getCourseById = async (id: string): Promise<ICourse | null> => {
  return Course.findById(id);
};

export const updateCourseById = async (id: string, data: Partial<ICourse>): Promise<ICourse | null> => {
  return Course.findByIdAndUpdate(id, data, { new: true });
};

export const deleteCourseById = async (id: string): Promise<ICourse | null> => {
  return Course.findByIdAndDelete(id);
};
