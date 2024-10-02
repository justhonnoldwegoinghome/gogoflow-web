import useSWRMutation from "swr/mutation";

import { post } from "@/apiClient";

interface ChangePasswordParams {
  data: {
    password: string;
  };
}

function changePassword({ data }: ChangePasswordParams) {
  return post<boolean>("/auth/change-password", data);
}

export function useChangePassword() {
  return useSWRMutation(
    "/change-password",
    (_, { arg }: { arg: ChangePasswordParams }) => changePassword(arg),
    {
      throwOnError: false,
    }
  );
}
