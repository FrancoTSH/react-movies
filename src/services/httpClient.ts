import axios, { AxiosError, AxiosRequestConfig } from "axios";

import { TokenService, Tokens } from "./auth";

const http = () => {
  const client = axios.create({
    baseURL: process.env.API_URL ?? "http://localhost:3000/v1",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const injectToken = (config: AxiosRequestConfig): AxiosRequestConfig => {
    const token = TokenService.getLocalAccessToken();

    if (token != null && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  };

  const refreshAccessTokenOnError = async (error: AxiosError) => {
    const prevRequest = error?.config as AxiosRequestConfig & { sent: boolean };

    if (
      error.response?.status === 401 &&
      !prevRequest?.sent &&
      TokenService.getLocalRefreshToken()
    ) {
      prevRequest.sent = true;
      const newTokens = await client.post("/auth/refresh-token", {
        refreshToken: TokenService.getLocalRefreshToken(),
      });
      const tokens = newTokens.data as Tokens;

      TokenService.updateLocalTokens(tokens);

      return client(prevRequest);
    }

    return Promise.reject(error);
  };

  client.interceptors.request.use(injectToken, (error) => Promise.reject(error));

  client.interceptors.response.use((response) => response, refreshAccessTokenOnError);

  return {
    async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
      return client.get(url, config).then((response) => response.data as T);
    },
    async post<T>(url: string, data: unknown = {}, config?: AxiosRequestConfig): Promise<T> {
      return client.post(url, data, config).then((response) => response.data as T);
    },
    async put<T>(url: string, data: unknown = {}, config?: AxiosRequestConfig): Promise<T> {
      return client.put(url, data, config).then((response) => response.data as T);
    },
    async patch<T>(url: string, data: unknown = {}, config?: AxiosRequestConfig): Promise<T> {
      return client.patch(url, data, config).then((response) => response.data as T);
    },
    async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
      return client.delete(url, config).then((response) => response.data as T);
    },
  };
};

export default http();
