import useSWR from "swr";

import { APIList, get } from "@/apiClient";
import { User } from "@/features/users";

import { Company } from "../types";

export function getUserCompanies({ id }: { id: User["id"] }) {
  return get<APIList<Company>>(`/users/${id}/companies`);
}

export function useUserCompanies({ id }: { id: User["id"] }) {
  return useSWR(`/users/${id}/companies`, () => getUserCompanies({ id }));
}
