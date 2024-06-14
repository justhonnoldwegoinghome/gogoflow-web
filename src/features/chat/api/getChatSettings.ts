import useSWR from "swr";

import { get } from "@/apiClient";
import { Company } from "@/features/companies";

import { ChatSettings } from "../types";

export function getChatSettings({ companyId }: { companyId: Company["id"] }) {
  return get<ChatSettings>(`/companies/${companyId}/chat-settings`);
}

export function useChatSettings({ companyId }: { companyId: Company["id"] }) {
  return useSWR(`/companies/${companyId}/chat-settings`, () =>
    getChatSettings({ companyId })
  );
}
