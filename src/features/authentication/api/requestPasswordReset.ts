import useSWRMutation from "swr/mutation";

import { post } from "@/apiClient";

interface RequestPasswordResetParams {
  data: {
    email: string;
  };
}

function requestPasswordReset({ data }: RequestPasswordResetParams) {
  return post<boolean>("/auth/request-password-reset", data);
}

export function useRequestPasswordReset() {
  return useSWRMutation(
    "/request-password-reset",
    (_, { arg }: { arg: RequestPasswordResetParams }) =>
      requestPasswordReset(arg),
    {
      throwOnError: false,
    }
  );
}
