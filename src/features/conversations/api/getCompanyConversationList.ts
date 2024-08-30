import _ from "lodash";
import { useMemo } from "react";
import useSWRInfinite from "swr/infinite";

import { getPaginationKey } from "@/utils";
import { APIList, get, MaxPageSize, PageToken } from "@/apiClient";
import { Company } from "@/features/companies";

import { Conversation } from "../types";
import { ConvoType, Source } from "../components/ConversationListController";

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
    (_, previousPageData) =>
      getPaginationKey("conversations", maxPageSize, previousPageData, {
        companyId: id,
        source,
        convoType,
      }),
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
