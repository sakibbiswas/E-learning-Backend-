// backend/src/utils/logger.util.ts
export const logInfo = (...args: any[]) => {
  console.info("[INFO]", ...args);
};

export const logError = (...args: any[]) => {
  console.error("[ERROR]", ...args);
};

export const logWarn = (...args: any[]) => {
  console.warn("[WARN]", ...args);
};
