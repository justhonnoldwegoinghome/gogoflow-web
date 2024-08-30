import useSWR from "swr";

import { get } from "@/apiClient";

import { Assistant } from "../types";

export function getAssistant({ id }: { id: Assistant["id"] }) {
  return get<Assistant>(`/assistants/${id}`);
}

export function useAssistant({ id }: { id: Assistant["id"] }) {
  return useSWR(`/assistants/${id}`, () => getAssistant({ id }));
}
