import httpClient from "services/httpClient";
import { User } from "types/user";

const BASE_URL = "profile";

function getProfile(): Promise<User> {
  return httpClient.get<User>(BASE_URL);
}

function updateProfile(data: Partial<User>): Promise<User> {
  return httpClient.post<User>(BASE_URL, data);
}

export const UserService = { getProfile, updateProfile };
