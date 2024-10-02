import useSWRMutation from "swr/mutation";

import { post } from "@/apiClient";

interface GenerateCustomerPortalSessionUrlParams {
  data: {
    return_url: string;
  };
}

function generateCustomerPortalSessionUrl({
  data,
}: GenerateCustomerPortalSessionUrlParams) {
  return post<string>("/generate-customer-portal-session-url", data);
}

export function useGenerateCustomerPortalSessionUrl() {
  return useSWRMutation(
    "/generate-customer-portal-session-url",
    (_, { arg }: { arg: GenerateCustomerPortalSessionUrlParams }) =>
      generateCustomerPortalSessionUrl(arg),
    {
      throwOnError: false,
    }
  );
}
