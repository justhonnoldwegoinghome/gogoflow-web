import useSWR from "swr";

import { APIList, get } from "@/apiClient";
import { Assistant } from "@/features/assistants";

import { Autoreply } from "../types";

export function getAssistantAutoreplyList({ id }: { id: Assistant["id"] }) {
  return get<APIList<Autoreply>>(`/assistants/${id}/autoreplies`);
}

export function useAssistantAutoreplyList({ id }: { id: Assistant["id"] }) {
  return useSWR(`/assistants/${id}/autoreplies`, () =>
    getAssistantAutoreplyList({ id })
  );
}
