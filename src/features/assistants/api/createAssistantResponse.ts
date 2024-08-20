import useSWRMutation from "swr/mutation";

import { post } from "@/apiClient";
import { Company } from "@/features/companies";
import { Message } from "@/features/messages";

import { AssistantResponse } from "../types";

interface CreateAssistantResponseParams {
  data: {
    companyId: Company["id"];
    source: "shopee";
    inputMessageList: Message[];
  };
}

export function createAssistantResponse({
  data,
}: CreateAssistantResponseParams) {
  return post<AssistantResponse>("/assistant-responses", {
    company_id: data["companyId"],
    source: data["source"],
    input_message_list: data["inputMessageList"],
  });
}

export function useCreateAssistantResponse({
  companyId,
}: {
  companyId: Company["id"];
}) {
  return useSWRMutation(
    `/companies/${companyId}/bot-responses`,
    (_, { arg }: { arg: Pick<CreateAssistantResponseParams, "data"> }) =>
      createAssistantResponse({
        data: arg["data"],
      }),
    {
      throwOnError: false,
    }
  );
}
