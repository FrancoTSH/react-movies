import httpClient from "services/httpClient";
import { User } from "types/user";

const BASE_URL = "auth";

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

function login(data: { email: string; password: string }): Promise<AuthResponse> {
  return httpClient.post<AuthResponse>(`${BASE_URL}/login`, data);
}

function register(data: Partial<User>): Promise<AuthResponse> {
  return httpClient.post<AuthResponse>(`${BASE_URL}/register`, data);
}

function logout(): Promise<{ success: boolean }> {
  return httpClient.post<{ success: boolean }>(`${BASE_URL}/logout`);
}

export const AuthService = { login, register, logout };
