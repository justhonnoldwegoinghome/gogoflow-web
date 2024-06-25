import useSWRMutation from "swr/mutation";
import { useRouter } from "next/router";

import { post } from "@/apiClient";
import { User } from "@/features/users";

interface RequestSignUpParams {
  data: {
    email: string;
    password: string;
  };
}

function requestSignUp({ data }: RequestSignUpParams) {
  return post<User>("/auth/request-sign-up", data);
}

export function useRequestSignUp() {
  const push = useRouter().push;

  return useSWRMutation(
    "/request-sign-up",
    (_, { arg }: { arg: RequestSignUpParams }) =>
      requestSignUp(arg).then(() => push("/auth/verify-email-msg")),
    {
      throwOnError: false,
    }
  );
}
