// ================= JWT TOKEN HOOKS =================

// useJwt.ts
import { jwtDecode } from "jwt-decode";
import { useCallback, useState } from "react";

const TOKEN_KEY = "auth_token";

export function useJwt() {
  const [token, setTokenState] = useState<string | null>(() => {
    return localStorage.getItem(TOKEN_KEY);
  });

  const setToken = useCallback((jwt: string) => {
    localStorage.setItem(TOKEN_KEY, jwt);
    setTokenState(jwt);
  }, []);

  const getToken = useCallback(() => {
    return token;
  }, [token]);

  const clearToken = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setTokenState(null);
  }, []);

  let user = {} as TokenPayload;

  if (token) {
    user = jwtDecode(token);
  }

  return {
    user,
    token,
    setToken,
    getToken,
    clearToken,
    isAuthenticated: !!token,
  };
}

export interface TokenPayload {
  employee_id: number;
  role_id?: number;
  role?: string;
  iat?: number;
  exp?: number;
}

// ================= USAGE EXAMPLE =================
/*
const { token, setToken, clearToken, isAuthenticated } = useJwt();


// after login
setToken(response.token);


// logout
clearToken();
*/

// ================= AXIOS INTEGRATION (OPTIONAL) =================
/*
import axios from "axios";


axios.interceptors.request.use((config) => {
const token = localStorage.getItem("auth_token");
if (token) {
config.headers.Authorization = `Bearer ${token}`;
}
return config;
});
*/
