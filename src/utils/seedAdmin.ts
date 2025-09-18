import bcrypt from "bcryptjs";
import { User } from "../models/User.model";

export const seedAdmin = async () => {
  const adminEmail = "admin@elearning.com";
  const existingAdmin = await User.findOne({ email: adminEmail });
  if (existingAdmin) return;

  const hashedPassword = await bcrypt.hash("Admin@123", 10);

  await User.create({
    name: "Super Admin",
    email: adminEmail,
    password: hashedPassword,
    role: "admin",
  });

  console.log("✅ Super Admin seeded");
};
