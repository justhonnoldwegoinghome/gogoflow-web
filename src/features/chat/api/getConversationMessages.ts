import useSWR from "swr";

import { APIList, get } from "@/apiClient";
import { Company } from "@/features/companies";

import { ConversationMessage } from "../types";

export function getConversationMessages({
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
  return get<APIList<ConversationMessage>>(
    `/conversations/${conversationId}/messages`,
    {
      params: {
        company_id: companyId,
        source,
        page_size: pageSize,
        next_page_token: nextPageToken,
      },
    }
  );
}

export function useConversationMessages({
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
      getConversationMessages({
        companyId,
        conversationId,
        source,
        pageSize,
        nextPageToken,
      })
  );
}
