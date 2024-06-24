import useSWR from "swr";

import { APIList, get } from "@/apiClient";
import { Company } from "@/features/companies";

import { Conversation } from "../types";

export function getConversations({
  companyId,
  source,
  pageSize,
  convoType,
  nextPageToken,
}: {
  companyId: Company["id"];
  source: "shopee";
  pageSize: number;
  convoType: "all" | "pinned" | "unread";
  nextPageToken?: string;
}) {
  return get<APIList<Conversation>>("/conversations", {
    params: {
      company_id: companyId,
      source,
      page_size: pageSize,
      convo_type: convoType,
      next_page_token: nextPageToken,
    },
  });
}

export function useConversations({
  companyId,
  source,
  pageSize,
  convoType,
  nextPageToken,
}: {
  companyId: Company["id"];
  source: "shopee";
  pageSize: number;
  convoType: "all" | "pinned" | "unread";
  nextPageToken?: string;
}) {
  return useSWR(`/companies/${companyId}/conversations`, () =>
    getConversations({ companyId, source, pageSize, convoType, nextPageToken })
  );
}
