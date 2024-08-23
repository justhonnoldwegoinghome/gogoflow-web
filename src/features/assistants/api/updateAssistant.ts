import useSWRMutation from "swr/mutation";

import { put } from "@/apiClient";

import { Assistant } from "../types";

interface UpdateAssistantParams {
  id: Assistant["id"];
  data: {
    name?: Assistant["name"];
    instructions?: Assistant["instructions"];
  };
}

function updateAssistant({ id, data }: UpdateAssistantParams) {
  return put<Assistant>(`/assistants/${id}`, data);
}

export function useUpdateAssistant({ id }: Pick<UpdateAssistantParams, "id">) {
  return useSWRMutation(
    `/assistants/${id}`,
    (_, { arg }: { arg: UpdateAssistantParams }) => updateAssistant(arg),
    {
      throwOnError: false,
    }
  );
}
