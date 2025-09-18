import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { errorMiddleware } from "./middlewares/error.middleware";
import path from "path";

// Routes
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import courseRoutes from "./routes/course.routes";
import paymentRoutes from "./routes/payment.routes";
import adminRoutes from "./routes/admin.routes";
import adminPaymentRoutes from "./routes/adminPayment.routes"; 
import adminAnalyticsRoutes from "./routes/adminAnalytics.routes";
const app = express();

// Middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/course", courseRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/admin/payments", adminPaymentRoutes);  
app.use("/api/admin/analytics", adminAnalyticsRoutes);

// Serve a favicon (create a favicon.ico in /public folder)
app.use("/favicon.ico", express.static(path.join(__dirname, "../public/favicon.ico")));

// Ignore Chrome DevTools .well-known requests
app.use("/.well-known", (req, res, next) => {
  // You can just return 204 No Content to silence logs
  return res.status(204).end();
});

// Global error handler
app.use(errorMiddleware);

export default app;
