import { post } from "@/apiClient";
import { User } from "@/features/users";

export function refreshAccessToken() {
  return post<User["id"]>("/auth/refresh-access-token", {});
}
