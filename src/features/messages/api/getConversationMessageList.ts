import useSWR from "swr";

import { APIList, get, MaxPageSize, PageToken } from "@/apiClient";
import { Company } from "@/features/companies";

import { Message } from "../types";

export function getConversationMessageList({
  companyId,
  conversationId,
  source,
  maxPageSize,
  pageToken,
}: {
  companyId: Company["id"];
  conversationId: string;
  source: "shopee";
  maxPageSize: MaxPageSize;
  pageToken: PageToken;
}) {
  return get<APIList<Message>>(`/conversations/${conversationId}/messages`, {
    params: {
      company_id: companyId,
      source,
      max_page_size: maxPageSize,
      page_token: pageToken,
    },
  });
}

export function useConversationMessageList({
  companyId,
  conversationId,
  source,
  maxPageSize,
  pageToken,
}: {
  companyId: Company["id"];
  conversationId: string;
  source: "shopee";
  maxPageSize: MaxPageSize;
  pageToken: PageToken;
}) {
  return useSWR(
    `/companies/${companyId}/conversations/${conversationId}/messages`,
    () =>
      getConversationMessageList({
        companyId,
        conversationId,
        source,
        maxPageSize,
        pageToken,
      })
  );
}
