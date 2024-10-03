import useSWRMutation from "swr/mutation";

import { post } from "@/apiClient";

interface CompletePasswordResetParams {
  data: {
    password: string;
    token: string;
  };
}

function completePasswordReset({ data }: CompletePasswordResetParams) {
  return post<boolean>("/auth/complete-password-reset", data);
}

export function useCompletePasswordReset() {
  return useSWRMutation(
    "/complete-password-reset",
    (_, { arg }: { arg: CompletePasswordResetParams }) =>
      completePasswordReset(arg),
    {
      throwOnError: false,
    }
  );
}
