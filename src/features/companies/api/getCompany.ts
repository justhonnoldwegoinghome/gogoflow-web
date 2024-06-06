import useSWR from "swr";

import { get } from "@/apiClient";

import { Company } from "../types";

export function getCompany({ id }: { id: Company["id"] }) {
  return get<Company>(`/companies/${id}`);
}

export function useCompany({ id }: { id: Company["id"] }) {
  return useSWR(`/companies/${id}`, () => getCompany({ id }));
}
