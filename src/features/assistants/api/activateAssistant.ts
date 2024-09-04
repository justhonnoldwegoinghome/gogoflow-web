import { mutate } from "swr";
import useSWRMutation from "swr/mutation";

import { post } from "@/apiClient";

import { Assistant } from "../types";

function activateAssistant({ id }: { id: Assistant["id"] }) {
  return post<Assistant>(`/assistants/${id}:activate`);
}

export function useActivateAssistant({ id }: { id: Assistant["id"] }) {
  return useSWRMutation(`/assistants/${id}`, () => activateAssistant({ id }), {
    throwOnError: false,
    onSuccess: (res) => {
      mutate(`/c/${res.data.company_id}/assistants`);
    },
  });
}
