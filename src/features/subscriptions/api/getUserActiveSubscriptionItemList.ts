import useSWR from "swr";

import { APIList, get } from "@/apiClient";
import { User } from "@/features/users";

import { ActiveSubscriptionItem } from "../types";

export function getUserActiveSubscriptionItemList({ id }: { id: User["id"] }) {
  return get<APIList<ActiveSubscriptionItem>>(
    `/users/${id}/active-subscription-items`
  );
}

export function useUserActiveSubscriptionItemList({ id }: { id: User["id"] }) {
  return useSWR(`/users/${id}/active-subscription-items`, () =>
    getUserActiveSubscriptionItemList({ id })
  );
}
