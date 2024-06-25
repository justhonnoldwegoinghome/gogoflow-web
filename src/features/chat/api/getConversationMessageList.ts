import useSWR from "swr";

import { APIList, get } from "@/apiClient";
import { Company } from "@/features/companies";

import { Message } from "../types";

export function getConversationMessageList({
  companyId,
  conversationId,
  source,
  pageSize,
  nextPageToken,
}: {
  companyId: Company["id"];
  conversationId: string;
  source: "shopee";
  pageSize: number | null;
  nextPageToken: string | null;
}) {
  return get<APIList<Message>>(`/conversations/${conversationId}/messages`, {
    params: {
      company_id: companyId,
      source,
      page_size: pageSize,
      next_page_token: nextPageToken,
    },
  });
}

export function useConversationMessageList({
  companyId,
  conversationId,
  source,
  pageSize,
  nextPageToken,
}: {
  companyId: Company["id"];
  conversationId: string;
  source: "shopee";
  pageSize: number | null;
  nextPageToken: string | null;
}) {
  return useSWR(
    `/companies/${companyId}/conversations/${conversationId}/messages`,
    () =>
      getConversationMessageList({
        companyId,
        conversationId,
        source,
        pageSize,
        nextPageToken,
      })
  );
}
