// backend/src/types/express.d.ts
import { Request } from "express";

declare module "express-serve-static-core" {
  interface Request {
    user?: {
      id: string;
      role: "user" | "admin";
    };
  }
}
