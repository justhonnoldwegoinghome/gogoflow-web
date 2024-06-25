import useSWR from "swr";

import { APIList, get } from "@/apiClient";
import { User } from "@/features/users";

import { Company } from "../types";

export function getUserCompanyList({ id }: { id: User["id"] }) {
  return get<APIList<Company>>(`/users/${id}/companies`);
}

export function useUserCompanyList({ id }: { id: User["id"] }) {
  return useSWR(`/users/${id}/companies`, () => getUserCompanyList({ id }));
}
