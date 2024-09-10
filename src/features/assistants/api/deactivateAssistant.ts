import { mutate } from "swr";
import useSWRMutation from "swr/mutation";

import { post } from "@/apiClient";

import { Assistant } from "../types";

function deactivateAssistant({ id }: { id: Assistant["id"] }) {
  return post<Assistant>(`/assistants/${id}:deactivate`);
}

export function useDeactivateAssistant({ id }: { id: Assistant["id"] }) {
  return useSWRMutation(
    `/assistants/${id}`,
    () => deactivateAssistant({ id }),
    {
      throwOnError: false,
      onSuccess: (res) => {
        mutate(`/c/${res.data.company_id}/assistants`);
      },
    }
  );
}
