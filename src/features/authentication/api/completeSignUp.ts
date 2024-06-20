import useSWRMutation from "swr/mutation";
import { useRouter } from "next/router";

import { post } from "@/apiClient";
import { User } from "@/features/users";

interface CompleteSignUpParams {
  data: {
    token: string;
  };
}

function completeSignUp({ data }: CompleteSignUpParams) {
  return post<User["id"]>("/auth/complete-sign-up", data);
}

export function useCompleteSignUp() {
  const push = useRouter().push;

  return useSWRMutation(
    "/complete-sign-up",
    (_, { arg }: { arg: CompleteSignUpParams }) =>
      completeSignUp(arg).then(() => push("/auth/log-in")),
    {
      throwOnError: false,
    }
  );
}
