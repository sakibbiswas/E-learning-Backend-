"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logWarn = exports.logError = exports.logInfo = void 0;
// backend/src/utils/logger.util.ts
const logInfo = (...args) => {
    console.info("[INFO]", ...args);
};
exports.logInfo = logInfo;
const logError = (...args) => {
    console.error("[ERROR]", ...args);
};
exports.logError = logError;
const logWarn = (...args) => {
    console.warn("[WARN]", ...args);
};
exports.logWarn = logWarn;
