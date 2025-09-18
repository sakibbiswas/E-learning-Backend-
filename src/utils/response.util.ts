// backend/src/utils/response.util.ts
import { Response } from "express";

export const successResponse = (res: Response, data: any, message = "Success", status = 200) => {
  return res.status(status).json({ status: "success", message, data });
};

export const errorResponse = (res: Response, message = "Error", status = 500, data: any = null) => {
  return res.status(status).json({ status: "error", message, data });
};
