import useSWRMutation from "swr/mutation";

import { post } from "@/apiClient";

import { Notification } from "../types";

interface MarkAsUnreadParams {
  id: Notification["id"];
}

export function markAsUnread({ id }: MarkAsUnreadParams) {
  return post<string>(`/notifications/${id}:mark-as-unread`, {});
}

export function useMarkAsUnread({ id }: { id: Notification["id"] }) {
  return useSWRMutation(
    `/notifications/${id}`,
    () =>
      markAsUnread({
        id,
      }),
    {
      throwOnError: false,
    }
  );
}
