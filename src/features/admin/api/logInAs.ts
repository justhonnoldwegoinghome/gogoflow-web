import useSWRMutation from "swr/mutation";
import { useRouter } from "next/router";

import { post } from "@/apiClient";
import { useAuthStore } from "@/features/authentication";
import { User } from "@/features/users";

interface LogInAsParams {
  data: {
    user_id: User["id"];
  };
}

function logInAs({ data }: LogInAsParams) {
  return post<User["id"]>("/admin/log-in-as", data);
}

export function useLogInAs() {
  const _logIn = useAuthStore((s) => s.logIn);

  const push = useRouter().push;

  return useSWRMutation(
    "/log-in",
    (_, { arg }: { arg: LogInAsParams }) =>
      logInAs(arg)
        .then((res) => _logIn(res.data))
        .then(() => push("/me")),
    {
      throwOnError: false,
    }
  );
}
