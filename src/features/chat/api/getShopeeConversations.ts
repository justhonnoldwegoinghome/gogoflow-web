import useSWR from "swr";

import { APIList, get } from "@/apiClient";
import { Company } from "@/features/companies";

import { ShopeeConversation } from "../types";

export function getShopeeConversations({
  companyId,
  pageSize,
  convoType,
  nextPageToken,
}: {
  companyId: Company["id"];
  pageSize: number;
  convoType: "all" | "pinned" | "unread";
  nextPageToken?: string;
}) {
  return get<APIList<ShopeeConversation>>(
    `/companies/${companyId}/shopee-conversations`,
    {
      params: {
        page_size: pageSize,
        convo_type: convoType,
        next_page_token: nextPageToken,
      },
    }
  );
}

export function useShopeeConversations({
  companyId,
  pageSize,
  convoType,
  nextPageToken,
}: {
  companyId: Company["id"];
  pageSize: number;
  convoType: "all" | "pinned" | "unread";
  nextPageToken?: string;
}) {
  return useSWR(`/companies/${companyId}/shopee-conversations`, () =>
    getShopeeConversations({ companyId, pageSize, convoType, nextPageToken })
  );
}
