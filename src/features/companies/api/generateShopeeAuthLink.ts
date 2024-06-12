import useSWRMutation from "swr/mutation";

import { post } from "@/apiClient";

import { Company } from "../types";

interface GenerateShopeeAuthLinkParams {
  companyId: Company["id"];
  data: {
    shopee_shop_id: string;
  };
}

function generateShopeeAuthorizationLink({
  companyId,
  data,
}: GenerateShopeeAuthLinkParams) {
  return post<string>(
    `/companies/${companyId}:generate-shopee-auth-link`,
    data
  );
}

export function useGenerateShopeeAuthLink({
  companyId,
}: {
  companyId: Company["id"];
}) {
  return useSWRMutation(
    `/companies/${companyId}:generate-shopee-auth-link`,
    (_, { arg }: { arg: GenerateShopeeAuthLinkParams }) =>
      generateShopeeAuthorizationLink(arg).then((res) => {
        window.location.href = res.data;
      }),
    {
      throwOnError: false,
    }
  );
}
