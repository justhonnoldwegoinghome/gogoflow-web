import useSWRMutation from "swr/mutation";

import { post } from "@/apiClient";

import { Notification } from "../types";

interface MarkAsReadParams {
  id: Notification["id"];
}

export function markAsRead({ id }: MarkAsReadParams) {
  return post<string>(`/notifications/${id}:mark-as-read`, {});
}

export function useMarkAsRead({ id }: { id: Notification["id"] }) {
  return useSWRMutation(
    `/notifications/${id}`,
    () =>
      markAsRead({
        id,
      }),
    {
      throwOnError: false,
    }
  );
}
