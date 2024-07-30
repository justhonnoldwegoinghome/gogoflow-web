import { format } from "date-fns";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { APIList, MaxPageSize } from "@/apiClient";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(d: Date) {
  return format(d, "dd MMM y");
}

export function formatTime(d: Date) {
  return format(d, "h:mmaaa");
}

export function getPaginationKey<Filters, ResultType>(
  resourceName: string,
  maxPageSize: MaxPageSize,
  previousPageData: APIList<ResultType>,
  filters: Filters
) {
  return {
    resourceName,
    maxPageSize,
    filters,
    pageToken: previousPageData?.next_page_token || null,
  };
}
