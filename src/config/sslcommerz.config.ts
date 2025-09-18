
import axios from "axios";
import qs from "qs";

const {
  SSLC_STORE_ID = "",
  SSLC_STORE_PASS = "",
  SSLC_IS_LIVE = "false",
  FRONTEND_URL = "http://localhost:3000",
  BASE_URL = "http://localhost:5000",
} = process.env;

export const isLive = String(SSLC_IS_LIVE).toLowerCase() === "true";
export const API_BASE = isLive
  ? "https://securepay.sslcommerz.com"
  : "https://sandbox.sslcommerz.com";

export const CREATE_SESSION_ENDPOINT = `${API_BASE}/gwprocess/v4/api.php`;
export const ORDER_VALIDATE_ENDPOINT = isLive
  ? "https://securepay.sslcommerz.com/validator/api/validationserverAPI.php"
  : "https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php"; // ✅ FIXED

export type CreateSessionPayload = {
  store_id: string;
  store_passwd: string;
  total_amount: number | string;
  currency?: string;
  tran_id: string;
  success_url: string;
  fail_url: string;
  cancel_url?: string;
  ipn_url?: string;
  cus_name?: string;
  cus_email?: string;
  cus_phone?: string;
  product_name?: string;
  product_category?: string;
  product_profile?: string;
  num_of_item?: number;
  [key: string]: any;
};

export function buildCreateSessionPayload(input: Partial<CreateSessionPayload>): CreateSessionPayload {
  const payload: CreateSessionPayload = {
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
    if (payload[k] === undefined) delete payload[k];
  });

  return payload;
}

export async function createSession(payload: CreateSessionPayload) {
  try {
    const form = qs.stringify(payload, { arrayFormat: "brackets" });
    const response = await axios.post(CREATE_SESSION_ENDPOINT, form, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      timeout: 10000,
    });
    return response.data;
  } catch (err) {
    const e = err as any;
    console.warn("⚠️ SSLCommerz sandbox EMI/createSession warning:", e?.response?.data ?? e?.message);
    throw new Error(e?.response?.data ?? e?.message);
  }
}

export async function validateOrder(params: { val_id?: string; tran_id?: string }) {
  const query: any = { store_id: SSLC_STORE_ID, store_passwd: SSLC_STORE_PASS, format: "json" };
  if (params.val_id) query.val_id = params.val_id;
  if (params.tran_id) query.tran_id = params.tran_id;

  try {
    const url = `${ORDER_VALIDATE_ENDPOINT}?${qs.stringify(query)}`;
    const response = await axios.get(url, { timeout: 10000 });
    return response.data;
  } catch (err) {
    const e = err as any;
    throw new Error(`SSLCOMMERZ validateOrder error: ${e?.response?.data ?? e?.message}`);
  }
}

export default {
  isLive,
  API_BASE,
  CREATE_SESSION_ENDPOINT,
  ORDER_VALIDATE_ENDPOINT,
  buildCreateSessionPayload,
  createSession,
  validateOrder,
};
