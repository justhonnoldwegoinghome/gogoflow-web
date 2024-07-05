import _ from "lodash";
import { useMemo } from "react";
import useSWRInfinite from "swr/infinite";

import { APIList, get, MaxPageSize, PageToken } from "@/apiClient";
import { Company } from "@/features/companies";

import { Conversation } from "../types";
import { ConvoType, Source } from "../components/ConversationListContainer";

function getConversationList({
  companyId,
  source,
  maxPageSize,
  convoType,
  nextPageToken,
}: {
  companyId: Company["id"];
  source: Source;
  maxPageSize: MaxPageSize;
  convoType: ConvoType;
  nextPageToken: PageToken;
}) {
  return get<APIList<Conversation>>("/conversations", {
    params: {
      company_id: companyId,
      source,
      max_page_size: maxPageSize,
      convo_type: convoType,
      next_page_token: nextPageToken,
    },
  });
}

export function useConversationListInfinite({
  maxPageSize,
  companyId,
  source,
  convoType,
}: {
  maxPageSize: MaxPageSize;
  companyId: Company["id"];
  source: Source;
  convoType: ConvoType;
}) {
  const { data, size, setSize, isValidating } = useSWRInfinite(
    (idx, previousPageData) =>
      getKey(idx, maxPageSize, companyId, previousPageData, source, convoType),
    (k) =>
      getConversationList({
        companyId,
        source,
        maxPageSize,
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
    isValidating,
  };
}

function getKey(
  pageIndex: number,
  maxPageSize: MaxPageSize,
  companyId: Company["id"],
  previousPageData: APIList<Conversation>,
  source: Source,
  convoType: ConvoType
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
      maxPageSize,
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
      maxPageSize,
      companyId,
      resource: "conversations",
      source,
      convoType,
      pageToken: null,
    };

  return {
    pageIndex,
    maxPageSize,
    companyId,
    resource: "conversations",
    source,
    convoType,
    pageToken: previousPageData.next_page_token,
  };
}
