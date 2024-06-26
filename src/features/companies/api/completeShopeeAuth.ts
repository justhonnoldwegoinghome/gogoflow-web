import useSWRMutation from "swr/mutation";
import { useRouter } from "next/router";

import { post } from "@/apiClient";

import { Company } from "../types";

interface CompleteShopeeAuthParams {
  companyId: Company["id"];
  data: {
    code: string;
  };
}

function completeShopeeAuth({ companyId, data }: CompleteShopeeAuthParams) {
  return post<any>(`/companies/${companyId}:complete-shopee-auth`, data);
}

export function useCompleteShopeeAuth({
  companyId,
}: {
  companyId: Company["id"];
}) {
  const { push } = useRouter();
  return useSWRMutation(
    `/companies/${companyId}`,
    (_, { arg }: { arg: CompleteShopeeAuthParams }) =>
      completeShopeeAuth(arg).then(() => push(`/c/${companyId}`)),
    {
      throwOnError: false,
    }
  );
}
