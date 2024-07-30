import { APIList, MaxPageSize } from "@/apiClient";

export const pagination = {
  getKey: <Filters, ResultType>(
    resourceName: string,
    maxPageSize: MaxPageSize,
    previousPageData: APIList<ResultType>,
    filters: Filters
  ) => {
    return {
      resourceName,
      maxPageSize,
      filters,
      pageToken: previousPageData?.next_page_token || null,
    };
  },
};
