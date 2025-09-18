// backend/src/utils/jwt.util.ts
import jwt, { SignOptions, JwtPayload as DefaultJwtPayload } from "jsonwebtoken";

const JWT_SECRET: string = process.env.JWT_SECRET || "supersecret";
const JWT_EXPIRES_IN: string | number = process.env.JWT_EXPIRES_IN || "7d"; // এখানে পরিবর্তন

// Custom payload
export interface JwtPayload extends DefaultJwtPayload {
  id: string;
  role: "user" | "admin";
}

// Token generate
export const generateToken = (payload: JwtPayload): string => {
  const options: SignOptions = { expiresIn: JWT_EXPIRES_IN as any }; // এখানে cast করে দিচ্ছি
  return jwt.sign(payload, JWT_SECRET as jwt.Secret, options);
};

// Token verify
export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, JWT_SECRET as jwt.Secret) as JwtPayload;
};
