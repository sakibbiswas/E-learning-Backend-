"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = exports.successResponse = void 0;
const successResponse = (res, data, message = "Success", status = 200) => {
    return res.status(status).json({ status: "success", message, data });
};
exports.successResponse = successResponse;
const errorResponse = (res, message = "Error", status = 500, data = null) => {
    return res.status(status).json({ status: "error", message, data });
};
exports.errorResponse = errorResponse;
