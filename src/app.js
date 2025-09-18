"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const error_middleware_1 = require("./middlewares/error.middleware");
const path_1 = __importDefault(require("path"));
// Routes
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const course_routes_1 = __importDefault(require("./routes/course.routes"));
const payment_routes_1 = __importDefault(require("./routes/payment.routes"));
const admin_routes_1 = __importDefault(require("./routes/admin.routes"));
const adminPayment_routes_1 = __importDefault(require("./routes/adminPayment.routes"));
const adminAnalytics_routes_1 = __importDefault(require("./routes/adminAnalytics.routes"));
const app = (0, express_1.default)();
// Middlewares
app.use((0, cors_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
// Routes
app.use("/api/auth", auth_routes_1.default);
app.use("/api/user", user_routes_1.default);
app.use("/api/course", course_routes_1.default);
app.use("/api/payment", payment_routes_1.default);
app.use("/api/admin", admin_routes_1.default);
app.use("/api/admin/payments", adminPayment_routes_1.default);
app.use("/api/admin/analytics", adminAnalytics_routes_1.default);
// Serve a favicon (create a favicon.ico in /public folder)
app.use("/favicon.ico", express_1.default.static(path_1.default.join(__dirname, "../public/favicon.ico")));
// Ignore Chrome DevTools .well-known requests
app.use("/.well-known", (req, res, next) => {
    // You can just return 204 No Content to silence logs
    return res.status(204).end();
});
// Global error handler
app.use(error_middleware_1.errorMiddleware);
exports.default = app;
