import useSWRMutation from "swr/mutation";

import { post } from "@/apiClient";
import { User } from "@/features/users";

import { useAuthStore } from "../stores/useAuthStore";

interface LogInParams {
  data: {
    email: string;
    password: string;
  };
}

function logIn({ data }: LogInParams) {
  return post<User["id"]>("/auth/log-in", data);
}

export function useLogIn() {
  const _logIn = useAuthStore((s) => s.logIn);

  return useSWRMutation(
    "/log-in",
    (_, { arg }: { arg: LogInParams }) =>
      logIn(arg).then((res) => _logIn(res.data)),
    {
      throwOnError: false,
    }
  );
}
