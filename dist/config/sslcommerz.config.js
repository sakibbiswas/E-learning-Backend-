"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ORDER_VALIDATE_ENDPOINT = exports.CREATE_SESSION_ENDPOINT = exports.API_BASE = exports.isLive = void 0;
exports.buildCreateSessionPayload = buildCreateSessionPayload;
exports.createSession = createSession;
exports.validateOrder = validateOrder;
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
    const payload = {
        store_id: SSLC_STORE_ID,
        store_passwd: SSLC_STORE_PASS,
        total_amount: input.total_amount ?? "0.00",
        currency: input.currency ?? "BDT",
        tran_id: input.tran_id ?? `tran_${Date.now()}`,
        success_url: input.success_url ?? `${BASE_URL}/api/payment/success`,
        fail_url: input.fail_url ?? `${BASE_URL}/api/payment/fail`,
        cancel_url: input.cancel_url ?? `${BASE_URL}/api/payment/cancel`,
        cus_name: input.cus_name,
        cus_email: input.cus_email,
        cus_phone: input.cus_phone,
        product_name: input.product_name ?? "Course",
        product_category: input.product_category ?? "Education",
        product_profile: input.product_profile ?? "general",
        num_of_item: input.num_of_item ?? 1,
        ...input,
    };
    Object.keys(payload).forEach((k) => {
        if (payload[k] === undefined)
            delete payload[k];
    });
    return payload;
}
async function createSession(payload) {
    try {
        const form = qs_1.default.stringify(payload, { arrayFormat: "brackets" });
        const response = await axios_1.default.post(exports.CREATE_SESSION_ENDPOINT, form, {
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            timeout: 10000,
        });
        return response.data;
    }
    catch (err) {
        const e = err;
        console.warn("⚠️ SSLCommerz sandbox EMI/createSession warning:", e?.response?.data ?? e?.message);
        throw new Error(e?.response?.data ?? e?.message);
    }
}
async function validateOrder(params) {
    const query = { store_id: SSLC_STORE_ID, store_passwd: SSLC_STORE_PASS, format: "json" };
    if (params.val_id)
        query.val_id = params.val_id;
    if (params.tran_id)
        query.tran_id = params.tran_id;
    try {
        const url = `${exports.ORDER_VALIDATE_ENDPOINT}?${qs_1.default.stringify(query)}`;
        const response = await axios_1.default.get(url, { timeout: 10000 });
        return response.data;
    }
    catch (err) {
        const e = err;
        throw new Error(`SSLCOMMERZ validateOrder error: ${e?.response?.data ?? e?.message}`);
    }
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
