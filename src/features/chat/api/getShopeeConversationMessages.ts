import useSWR from "swr";

import { APIList, get } from "@/apiClient";
import { Company } from "@/features/companies";

import { ShopeeConversationMessage } from "../types";

export function getShopeeConversationMessages({
  companyId,
  conversationId,
}: {
  companyId: Company["id"];
  conversationId: string;
}) {
  return get<APIList<ShopeeConversationMessage>>(
    `/shopee-conversations/${conversationId}/messages`,
    {
      params: {
        company_id: companyId,
      },
    }
  );
}

export function useShopeeConversationMessages({
  companyId,
  conversationId,
}: {
  companyId: Company["id"];
  conversationId: string;
}) {
  return useSWR(
    `/companies/${companyId}/shopee-conversations/${conversationId}/messages`,
    () =>
      getShopeeConversationMessages({
        companyId,
        conversationId,
      })
  );
}
