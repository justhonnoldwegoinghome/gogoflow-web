import useSWR from "swr";

import { APIList, get } from "@/apiClient";
import { Assistant } from "@/features/assistants";

import { TestAutoreply } from "../types";

export function getAssistantTestAutoreplyList({ id }: { id: Assistant["id"] }) {
  return get<APIList<TestAutoreply>>(`/assistants/${id}/test-autoreplies`);
}

export function useAssistantTestAutoreplyList({ id }: { id: Assistant["id"] }) {
  return useSWR(`/assistants/${id}/test-autoreplies`, () =>
    getAssistantTestAutoreplyList({ id })
  );
}
