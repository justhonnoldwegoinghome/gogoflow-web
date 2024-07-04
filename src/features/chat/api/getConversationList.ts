import _ from "lodash";
import { useMemo } from "react";
import useSWRInfinite from "swr/infinite";

import { APIList, get } from "@/apiClient";
import { Company } from "@/features/companies";

import { Conversation } from "../types";

export function getConversationList({
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
  nextPageToken: string | null;
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

export function useConversationListInfinite({
  pageSize,
  companyId,
  source,
  convoType,
}: {
  pageSize: number;
  companyId: Company["id"];
  source: "shopee";
  convoType: "all" | "unread" | "pinned";
}) {
  const { data, size, setSize } = useSWRInfinite(
    (idx, previousPageData) =>
      getKey(idx, pageSize, companyId, previousPageData, source, convoType),
    (k) =>
      getConversationList({
        companyId,
        source,
        pageSize,
        convoType,
        nextPageToken: k.pageToken,
      }),
    {
      revalidateFirstPage: false, // issue 1401 but not needed for less dynamic apps like this
    }
  );

  const hasEnded = useMemo(() => {
    if (data && data[data.length - 1].next_page_token === null) {
      return true;
    } else {
      return false;
    }
  }, [data]);

  return {
    data: data
      ? {
          results: _.flatten(data.map((d) => d.results)),
        }
      : undefined,
    hasEnded,
    loadMore: () => setSize(size + 1),
  };
}

function getKey(
  pageIndex: number,
  pageSize: number,
  companyId: Company["id"],
  previousPageData: APIList<Conversation>,
  source: "shopee",
  convoType: "all" | "unread" | "pinned"
) {
  // In the documentation, SWR uses `key` for two purposes:
  // 1) Serve as an index for its cache
  // 2) Server as a url for its fetcher

  // We typically use it only for 1).
  // But in this case, while we do not use it directly as a url, we still use it for purpose 2) in that we use it to store our nextPageToken.

  // First page
  if (pageIndex === 0)
    return {
      pageIndex,
      pageSize,
      companyId,
      resource: "conversations",
      source,
      convoType,
      pageToken: null,
    };

  // Last page
  if (previousPageData && !previousPageData.next_page_token)
    return {
      pageIndex,
      pageSize,
      companyId,
      resource: "conversations",
      source,
      convoType,
      pageToken: null,
    };

  return {
    pageIndex,
    pageSize,
    companyId,
    resource: "conversations",
    source,
    convoType,
    pageToken: previousPageData.next_page_token,
  };
}
