import _ from "lodash";
import { useMemo } from "react";
import useSWRInfinite from "swr/infinite";

import { APIList, get, MaxPageSize, PageToken } from "@/apiClient";
import { Company } from "@/features/companies";

import { Conversation } from "../types";
import {
  ConvoType,
  Source,
} from "../components/CompanyConversationListContainer";

function getCompanyConversationList({
  id,
  source,
  maxPageSize,
  convoType,
  pageToken,
}: {
  id: Company["id"];
  source: Source;
  maxPageSize: MaxPageSize;
  convoType: ConvoType;
  pageToken: PageToken;
}) {
  return get<APIList<Conversation>>(`/companies/${id}/conversations`, {
    params: {
      source,
      max_page_size: maxPageSize,
      convo_type: convoType,
      page_token: pageToken,
    },
  });
}

export function useCompanyConversationListInfinite({
  id,
  maxPageSize,
  source,
  convoType,
}: {
  id: Company["id"];
  maxPageSize: MaxPageSize;
  source: Source;
  convoType: ConvoType;
}) {
  const { data, size, setSize, isValidating } = useSWRInfinite(
    (idx, previousPageData) =>
      getKey(id, idx, maxPageSize, previousPageData, source, convoType),
    (k) =>
      getCompanyConversationList({
        id,
        source,
        maxPageSize,
        convoType,
        pageToken: k.pageToken,
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
  id: Company["id"],
  pageIndex: number,
  maxPageSize: MaxPageSize,
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
      id,
      pageIndex,
      maxPageSize,
      resource: "conversations",
      source,
      convoType,
      pageToken: null,
    };

  // Last page
  if (previousPageData && !previousPageData.next_page_token)
    return {
      id,
      pageIndex,
      maxPageSize,
      resource: "conversations",
      source,
      convoType,
      pageToken: null,
    };

  return {
    id,
    pageIndex,
    maxPageSize,
    resource: "conversations",
    source,
    convoType,
    pageToken: previousPageData.next_page_token,
  };
}
