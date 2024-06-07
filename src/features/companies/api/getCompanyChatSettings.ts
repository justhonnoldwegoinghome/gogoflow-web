import useSWR from "swr";

import { get } from "@/apiClient";

import { Company, CompanyChatSettings } from "../types";

export function getCompanyChatSettings({ id }: { id: Company["id"] }) {
  return get<CompanyChatSettings>(`/companies/${id}/chat-settings`);
}

export function useCompanyChatSettings({ id }: { id: Company["id"] }) {
  return useSWR(`/companies/${id}/chat-settings`, () =>
    getCompanyChatSettings({ id })
  );
}
