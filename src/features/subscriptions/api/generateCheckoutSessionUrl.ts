import useSWRMutation from "swr/mutation";

import { post } from "@/apiClient";

interface GenerateCheckoutSessionUrlParams {
  data: {
    plan: "pro";
    success_url: string;
    return_url: string;
  };
}

function generateCheckoutSessionUrl({
  data,
}: GenerateCheckoutSessionUrlParams) {
  return post<string>("/generate-checkout-session-url", data);
}

export function useGenerateCheckoutSessionUrl() {
  return useSWRMutation(
    "/generate-checkout-session-url",
    (_, { arg }: { arg: GenerateCheckoutSessionUrlParams }) =>
      generateCheckoutSessionUrl(arg),
    {
      throwOnError: false,
    }
  );
}
