import useSWR from "swr";

import { get } from "@/apiClient";
import { Company } from "@/features/companies";

import { Chat } from "../types";

export function getChat({ companyId }: { companyId: Company["id"] }) {
  return get<Chat>(`/companies/${companyId}/chat`);
}

export function useChat({ companyId }: { companyId: Company["id"] }) {
  return useSWR(`/companies/${companyId}/chat`, () => getChat({ companyId }));
}
