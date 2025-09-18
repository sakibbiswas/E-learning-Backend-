// backend/src/models/User.model.ts
import { Schema, model, Document, Types } from "mongoose";

export type UserRole = "user" | "admin";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string; // hashed
  role: UserRole;
  purchasedCourses: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    purchasedCourses: [
      { type: Schema.Types.ObjectId, ref: "Course", default: [] },
    ],
  },
  { timestamps: true }
);

export const User = model<IUser>("User", userSchema);
