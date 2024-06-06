import useSWRMutation from "swr/mutation";
import { useRouter } from "next/router";

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

  const push = useRouter().push;

  return useSWRMutation(
    "/log-in",
    (_, { arg }: { arg: LogInParams }) =>
      logIn(arg)
        .then((res) => _logIn(res.data))
        .then(() => push("/me")),
    {
      throwOnError: false,
    }
  );
}
