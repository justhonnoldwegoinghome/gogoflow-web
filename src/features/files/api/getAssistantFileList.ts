import useSWR from "swr";

import { APIList, get } from "@/apiClient";
import { Assistant } from "@/features/assistants";

import { File } from "../types";

export function getAssistantFileList({ id }: { id: Assistant["id"] }) {
  return get<APIList<File>>(`/assistants/${id}/files`);
}

export function useAssistantFileList({ id }: { id: Assistant["id"] }) {
  return useSWR(`/assistants/${id}/files`, () => getAssistantFileList({ id }));
}
