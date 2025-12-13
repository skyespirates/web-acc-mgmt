import type { LoginPayload, SuccessResponse } from "../pages/Login";
import client from "../utils/axios";

export async function login(payload: LoginPayload): Promise<SuccessResponse> {
  const response = await client.post<SuccessResponse>("/login", payload);
  return response.data;
}
