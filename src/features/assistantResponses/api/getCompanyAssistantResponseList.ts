import _ from "lodash";
import { useMemo } from "react";
import useSWRInfinite from "swr/infinite";

import { APIList, get, MaxPageSize, PageToken } from "@/apiClient";
import { getPaginationKey } from "@/utils";
import { Company } from "@/features/companies";

import { AssistantResponse } from "../types";

function getCompanyAssistantResponseList({
  id,
  maxPageSize,
  pageToken,
}: {
  id: Company["id"];
  maxPageSize: MaxPageSize;
  pageToken: PageToken;
}) {
  return get<APIList<AssistantResponse>>(
    `/companies/${id}/assistant-responses`,
    {
      params: {
        max_page_size: maxPageSize,
        page_token: pageToken,
      },
    }
  );
}

export function useCompanyAssistantResponseListInfinite({
  id,
  maxPageSize,
}: {
  id: Company["id"];
  maxPageSize: MaxPageSize;
}) {
  const { data, size, setSize, isValidating } = useSWRInfinite(
    (_, previousPageData) =>
      getPaginationKey("bot-responses", maxPageSize, previousPageData, {
        companyId: id,
      }),
    (k) =>
      getCompanyAssistantResponseList({
        id,
        maxPageSize,
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
