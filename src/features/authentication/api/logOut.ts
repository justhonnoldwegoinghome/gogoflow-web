import useSWRMutation from "swr/mutation";

import { post } from "@/apiClient";

import { useAuthStore } from "../stores/useAuthStore";

export function logOut() {
  return post<string>("/auth/log-out", {});
}

export function useLogOut() {
  const _logOut = useAuthStore((s) => s.logOut);

  return useSWRMutation("/log-out", () => logOut().then(_logOut), {
    throwOnError: false,
  });
}
