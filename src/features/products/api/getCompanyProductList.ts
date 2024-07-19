import _ from "lodash";
import { useMemo } from "react";
import useSWRInfinite from "swr/infinite";

import { APIList, get, MaxPageSize, PageToken } from "@/apiClient";
import { Company } from "@/features/companies";

import { Product } from "../types";
import { Source, Status } from "../components/CompanyProductListContainer";

function getCompanyProductList({
  id,
  source,
  status,
  maxPageSize,
  pageToken,
}: {
  id: Company["id"];
  source: Source;
  status: Status;
  maxPageSize: MaxPageSize;
  pageToken: PageToken;
}) {
  return get<APIList<Product>>(`/companies/${id}/products`, {
    params: {
      source,
      status,
      max_page_size: maxPageSize,
      page_token: pageToken,
    },
  });
}

export function useCompanyProductListInfinite({
  id,
  maxPageSize,
  source,
  status,
}: {
  id: Company["id"];
  maxPageSize: MaxPageSize;
  source: Source;
  status: Status;
}) {
  const { data, size, setSize, isValidating } = useSWRInfinite(
    (idx, previousPageData) =>
      getKey(id, idx, maxPageSize, previousPageData, source, status),
    (k) =>
      getCompanyProductList({
        id,
        source,
        status,
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
  previousPageData: APIList<Product>,
  source: Source,
  status: Status
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
      resource: "products",
      source,
      status,
      pageToken: null,
    };

  // Last page
  if (previousPageData && !previousPageData.next_page_token)
    return {
      id,
      pageIndex,
      maxPageSize,
      resource: "products",
      source,
      status,
      pageToken: null,
    };

  return {
    id,
    pageIndex,
    maxPageSize,
    resource: "products",
    source,
    status,
    pageToken: previousPageData.next_page_token,
  };
}
