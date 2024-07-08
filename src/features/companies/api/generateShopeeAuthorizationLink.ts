import useSWRMutation from "swr/mutation";

import { post } from "@/apiClient";

import { Company } from "../types";

interface GenerateShopeeAuthorizationLinkParams {
  companyId: Company["id"];
  data: {
    shopee_shop_id: Company["shopee"]["shop_id"];
  };
}

function generateShopeeAuthorizationLink({
  companyId,
  data,
}: GenerateShopeeAuthorizationLinkParams) {
  return post<string>(
    `/companies/${companyId}:generate-shopee-authorization-link`,
    data
  );
}

export function useGenerateShopeeAuthorizationLink({
  companyId,
}: {
  companyId: Company["id"];
}) {
  return useSWRMutation(
    `/companies/${companyId}:generate-shopee-authorization-link`,
    (_, { arg }: { arg: GenerateShopeeAuthorizationLinkParams }) =>
      generateShopeeAuthorizationLink(arg).then((res) => {
        window.location.href = res.data;
      }),
    {
      throwOnError: false,
    }
  );
}
