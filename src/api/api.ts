import type { AddMenuResponse, MenuPayload } from "../components/MenuForm";
import type { LoginPayload, SuccessResponse } from "../pages/Login";
import client from "../utils/axios";

export async function login(payload: LoginPayload): Promise<SuccessResponse> {
  const response = await client.post<SuccessResponse>("/login", payload);
  return response.data;
}

export interface Menu {
  menu_id: number;
  name: string;
  parent_id: number;
  url: string;
  sort_order: number;
}

export interface SuccessMenu {
  result: Menu[];
}

export async function getMenu(token: string) {
  const response = await client.get<SuccessMenu>("/menus", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.result;
}

export async function addMenu(payload: MenuPayload): Promise<AddMenuResponse> {
  const response = await client.post("/menus", payload);
  return response.data;
}
