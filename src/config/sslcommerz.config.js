"use strict";
// // backend/src/config/sslcommerz.config.ts
// import axios from "axios";
// import qs from "qs";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ORDER_VALIDATE_ENDPOINT = exports.CREATE_SESSION_ENDPOINT = exports.API_BASE = exports.isLive = void 0;
exports.buildCreateSessionPayload = buildCreateSessionPayload;
exports.createSession = createSession;
exports.validateOrder = validateOrder;
// const {
//   SSLC_STORE_ID = "",
//   SSLC_STORE_PASS = "",
//   SSLC_IS_LIVE = "false",
//   FRONTEND_URL = "http://localhost:3000",
//   BASE_URL = "http://localhost:5000",
// } = process.env;
// if (!SSLC_STORE_ID || !SSLC_STORE_PASS) {
//   console.warn(
//     "⚠️ SSLCOMMERZ store ID or password missing in env. Make sure to set SSLC_STORE_ID and SSLC_STORE_PASS."
//   );
// }
// /**
//  * Determine base URLs based on environment
//  */
// export const isLive = String(SSLC_IS_LIVE).toLowerCase() === "true";
// export const API_BASE = isLive
//   ? "https://securepay.sslcommerz.com"
//   : "https://sandbox.sslcommerz.com";
// export const CREATE_SESSION_ENDPOINT = `${API_BASE}/gwprocess/v4/api.php`;
// export const ORDER_VALIDATE_ENDPOINT = isLive
//   ? "https://securepay.sslcommerz.com/validator/api/validationserverAPI.php"
//   : "https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php";
// export type CreateSessionPayload = {
//   store_id: string;
//   store_passwd: string;
//   total_amount: number | string;
//   currency?: string;
//   tran_id: string;
//   success_url: string;
//   fail_url: string;
//   cancel_url?: string;
//   ipn_url?: string;
//   cus_name?: string;
//   cus_email?: string;
//   cus_phone?: string;
//   product_name?: string;
//   product_category?: string;
//   product_profile?: string;
//   num_of_item?: number;
//   [key: string]: any;
// };
// export function buildCreateSessionPayload(
//   input: Partial<CreateSessionPayload>
// ): CreateSessionPayload {
//   const payload: CreateSessionPayload = {
//     store_id: SSLC_STORE_ID,
//     store_passwd: SSLC_STORE_PASS,
//     total_amount: input.total_amount ?? "0.00",
//     currency: input.currency ?? "BDT",
//     tran_id: input.tran_id ?? `tran_${Date.now()}`,
//     success_url: input.success_url ?? `${BASE_URL}/api/payment/success`,
//     fail_url: input.fail_url ?? `${BASE_URL}/api/payment/fail`,
//     cancel_url: input.cancel_url ?? `${BASE_URL}/api/payment/cancel`,
//     cus_name: input.cus_name,
//     cus_email: input.cus_email,
//     cus_phone: input.cus_phone,
//     product_name: input.product_name ?? "Course",
//     product_category: input.product_category ?? "Education",
//     product_profile: input.product_profile ?? "general",
//     num_of_item: input.num_of_item ?? 1,
//     ...input,
//   };
//   Object.keys(payload).forEach((k) => {
//     if (payload[k] === undefined) delete payload[k];
//   });
//   return payload;
// }
// export async function createSession(payload: CreateSessionPayload) {
//   try {
//     const form = qs.stringify(payload, { arrayFormat: "brackets" });
//     const response = await axios.post(CREATE_SESSION_ENDPOINT, form, {
//       headers: { "Content-Type": "application/x-www-form-urlencoded" },
//       timeout: 10000,
//     });
//     return response.data;
//   } catch (err) {
//     const e = err as any;
//     throw new Error(
//       `SSLCOMMERZ createSession error: ${
//         e?.response?.data ?? e?.message ?? e
//       }`
//     );
//   }
// }
// export async function validateOrder(params: {
//   val_id?: string;
//   tran_id?: string;
// }) {
//   const query: any = {
//     store_id: SSLC_STORE_ID,
//     store_passwd: SSLC_STORE_PASS,
//     format: "json",
//   };
//   if (params.val_id) query.val_id = params.val_id;
//   if (params.tran_id) query.tran_id = params.tran_id;
//   try {
//     const url = `${ORDER_VALIDATE_ENDPOINT}?${qs.stringify(query)}`;
//     const response = await axios.get(url, { timeout: 10000 });
//     return response.data;
//   } catch (err) {
//     const e = err as any;
//     throw new Error(
//       `SSLCOMMERZ validateOrder error: ${e?.response?.data ?? e?.message}`
//     );
//   }
// }
// export default {
//   isLive,
//   API_BASE,
//   CREATE_SESSION_ENDPOINT,
//   ORDER_VALIDATE_ENDPOINT,
//   buildCreateSessionPayload,
//   createSession,
//   validateOrder,
// };
const axios_1 = __importDefault(require("axios"));
const qs_1 = __importDefault(require("qs"));
const { SSLC_STORE_ID = "", SSLC_STORE_PASS = "", SSLC_IS_LIVE = "false", FRONTEND_URL = "http://localhost:3000", BASE_URL = "http://localhost:5000", } = process.env;
exports.isLive = String(SSLC_IS_LIVE).toLowerCase() === "true";
exports.API_BASE = exports.isLive
    ? "https://securepay.sslcommerz.com"
    : "https://sandbox.sslcommerz.com";
exports.CREATE_SESSION_ENDPOINT = `${exports.API_BASE}/gwprocess/v4/api.php`;
exports.ORDER_VALIDATE_ENDPOINT = exports.isLive
    ? "https://securepay.sslcommerz.com/validator/api/validationserverAPI.php"
    : "https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php"; // ✅ FIXED
function buildCreateSessionPayload(input) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    const payload = Object.assign({ store_id: SSLC_STORE_ID, store_passwd: SSLC_STORE_PASS, total_amount: (_a = input.total_amount) !== null && _a !== void 0 ? _a : "0.00", currency: (_b = input.currency) !== null && _b !== void 0 ? _b : "BDT", tran_id: (_c = input.tran_id) !== null && _c !== void 0 ? _c : `tran_${Date.now()}`, success_url: (_d = input.success_url) !== null && _d !== void 0 ? _d : `${BASE_URL}/api/payment/success`, fail_url: (_e = input.fail_url) !== null && _e !== void 0 ? _e : `${BASE_URL}/api/payment/fail`, cancel_url: (_f = input.cancel_url) !== null && _f !== void 0 ? _f : `${BASE_URL}/api/payment/cancel`, cus_name: input.cus_name, cus_email: input.cus_email, cus_phone: input.cus_phone, product_name: (_g = input.product_name) !== null && _g !== void 0 ? _g : "Course", product_category: (_h = input.product_category) !== null && _h !== void 0 ? _h : "Education", product_profile: (_j = input.product_profile) !== null && _j !== void 0 ? _j : "general", num_of_item: (_k = input.num_of_item) !== null && _k !== void 0 ? _k : 1 }, input);
    Object.keys(payload).forEach((k) => {
        if (payload[k] === undefined)
            delete payload[k];
    });
    return payload;
}
function createSession(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c, _d;
        try {
            const form = qs_1.default.stringify(payload, { arrayFormat: "brackets" });
            const response = yield axios_1.default.post(exports.CREATE_SESSION_ENDPOINT, form, {
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                timeout: 10000,
            });
            return response.data;
        }
        catch (err) {
            const e = err;
            console.warn("⚠️ SSLCommerz sandbox EMI/createSession warning:", (_b = (_a = e === null || e === void 0 ? void 0 : e.response) === null || _a === void 0 ? void 0 : _a.data) !== null && _b !== void 0 ? _b : e === null || e === void 0 ? void 0 : e.message);
            throw new Error((_d = (_c = e === null || e === void 0 ? void 0 : e.response) === null || _c === void 0 ? void 0 : _c.data) !== null && _d !== void 0 ? _d : e === null || e === void 0 ? void 0 : e.message);
        }
    });
}
function validateOrder(params) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b;
        const query = { store_id: SSLC_STORE_ID, store_passwd: SSLC_STORE_PASS, format: "json" };
        if (params.val_id)
            query.val_id = params.val_id;
        if (params.tran_id)
            query.tran_id = params.tran_id;
        try {
            const url = `${exports.ORDER_VALIDATE_ENDPOINT}?${qs_1.default.stringify(query)}`;
            const response = yield axios_1.default.get(url, { timeout: 10000 });
            return response.data;
        }
        catch (err) {
            const e = err;
            throw new Error(`SSLCOMMERZ validateOrder error: ${(_b = (_a = e === null || e === void 0 ? void 0 : e.response) === null || _a === void 0 ? void 0 : _a.data) !== null && _b !== void 0 ? _b : e === null || e === void 0 ? void 0 : e.message}`);
        }
    });
}
exports.default = {
    isLive: exports.isLive,
    API_BASE: exports.API_BASE,
    CREATE_SESSION_ENDPOINT: exports.CREATE_SESSION_ENDPOINT,
    ORDER_VALIDATE_ENDPOINT: exports.ORDER_VALIDATE_ENDPOINT,
    buildCreateSessionPayload,
    createSession,
    validateOrder,
};
