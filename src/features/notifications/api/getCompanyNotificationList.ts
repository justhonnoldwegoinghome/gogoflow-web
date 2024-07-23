import _ from "lodash";
import { useMemo } from "react";
import useSWRInfinite from "swr/infinite";

import { APIList, get, MaxPageSize, PageToken } from "@/apiClient";
import { Company } from "@/features/companies";

import { Notification } from "../types";

function getCompanyNotificationList({
  id,
  maxPageSize,
  pageToken,
}: {
  id: Company["id"];
  maxPageSize: MaxPageSize;
  pageToken: PageToken;
}) {
  return get<APIList<Notification>>(`/companies/${id}/notifications`, {
    params: {
      max_page_size: maxPageSize,
      page_token: pageToken,
    },
  });
}

export function useCompanyNotificationListInfinite({
  id,
  maxPageSize,
}: {
  id: Company["id"];
  maxPageSize: MaxPageSize;
}) {
  const { data, size, setSize, isValidating } = useSWRInfinite(
    (idx, previousPageData) => getKey(id, idx, maxPageSize, previousPageData),
    (k) =>
      getCompanyNotificationList({
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

function getKey(
  id: Company["id"],
  pageIndex: number,
  maxPageSize: MaxPageSize,
  previousPageData: APIList<Notification>
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
      resource: "notifications",
      pageToken: null,
    };

  // Last page
  if (previousPageData && !previousPageData.next_page_token)
    return {
      id,
      pageIndex,
      maxPageSize,
      resource: "notifications",
      pageToken: null,
    };

  return {
    id,
    pageIndex,
    maxPageSize,
    resource: "notifications",
    pageToken: previousPageData.next_page_token,
  };
}
