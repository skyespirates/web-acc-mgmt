import type {
  PermissionPayload,
  PermissionResponse,
} from "../components/AddPermission";
import type {
  DeleteMenuPayload,
  DeleteMenuResponse,
} from "../components/DeleteMenu";
import type { AddMenuResponse, MenuPayload } from "../components/MenuForm";
import type { RoleListResponse } from "../components/RoleList";
import type { UpdateMenuPayload } from "../components/UpdateMenu";
import type { UserRolesResponse } from "../components/UserRoles";
import type { LoginPayload, SuccessResponse } from "../pages/Login";
import client from "../utils/axios";
import axios from "axios";

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

export async function getMenu() {
  const response = await client.get<SuccessMenu>("/menus");
  return response.data.result;
}

export async function addMenu(payload: MenuPayload): Promise<AddMenuResponse> {
  const response = await client.post("/menus", payload);
  return response.data;
}

export async function addPermisson(
  payload: PermissionPayload
): Promise<PermissionResponse> {
  const response = await client.post("/permissions", payload);
  return response.data;
}

export async function deleteMenu(
  payload: DeleteMenuPayload
): Promise<DeleteMenuResponse> {
  const response = await client.delete<DeleteMenuResponse>(
    `/menus/${payload.menu_id}`
  );
  return response.data;
}

interface ErrorResponseData {
  status: string;
  message: string;
}

export async function updateMenu(payload: UpdateMenuPayload) {
  try {
    const response = await client.patch(`/menus/${payload.menu_id}`, payload);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      // Axios error with a server response (e.g., HTTP 400 or 500)

      const status = error.response.status;
      const errorData: ErrorResponseData = error.response.data;

      console.error(`API Error on Update (${status}):`, errorData.message);

      // Re-throw the error object, including the useful response details,
      // so the caller (like useMutation) can access them.
      throw {
        status: status,
        message: errorData.message,
      };
    } else if (axios.isAxiosError(error)) {
      // Network error (no response from server)
      console.error("Network Error:", error.message);
      throw {
        status: 0,
        message: "Network connection failed or request timed out.",
      };
    } else {
      // General JavaScript error
      console.error("Unknown Error:", error);
      throw {
        status: 0,
        message: "An unknown error occurred.",
      };
    }
  }
}

export async function addRole(role: string) {
  const response = await client.post("/roles", { name: role });
  return response.data;
}

export async function getRoleList(): Promise<RoleListResponse> {
  const response = await client.get("/roles");
  return response.data;
}

export async function getUserRoles(): Promise<UserRolesResponse> {
  const response = await client.get<UserRolesResponse>("/roles/user");
  return response.data;
}
