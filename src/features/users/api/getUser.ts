import useSWR from "swr";

import { get } from "@/apiClient";

import { User } from "../types";

function getUser({ id }: { id: User["id"] }) {
  return get<User>(`/users/${id}`);
}

export function useUser({ id }: { id: User["id"] }) {
  return useSWR(`/users/${id}`, () => getUser({ id }));
}
