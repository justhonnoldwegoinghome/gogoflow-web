import useSWR from "swr";

import { get } from "@/apiClient";

import { Notification } from "../types";

export function getNotification({ id }: { id: Notification["id"] }) {
  return get<Notification>(`/notifications/${id}`);
}

export function useNotification({ id }: { id: Notification["id"] }) {
  return useSWR(`/notifications/${id}`, () => getNotification({ id }));
}
