import _ from "lodash";
import { useMemo } from "react";
import useSWRInfinite from "swr/infinite";

import { APIList, get, MaxPageSize, PageToken } from "@/apiClient";
import { pagination } from "@/utils/pagination";
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
    (_, previousPageData) =>
      pagination.getKey("products", maxPageSize, previousPageData, {
        companyId: id,
        source,
        status,
      }),
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
