import useSWRMutation from "swr/mutation";

import { post } from "@/apiClient";

export function logOut() {
  return post<string>("/auth/log-out", {});
}

export function useLogOut() {
  return useSWRMutation("/log-out", () => logOut(), {
    throwOnError: false,
  });
}
