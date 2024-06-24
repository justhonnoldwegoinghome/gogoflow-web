import useSWRMutation from "swr/mutation";

import { post } from "@/apiClient";
import { Company } from "@/features/companies";

import { ChatCompletion, Message } from "../types";

interface CreateChatCompletionParams {
  data: {
    companyId: Company["id"];
    inputMessageList: Message[];
  };
}

export function createChatCompletion({ data }: CreateChatCompletionParams) {
  return post<ChatCompletion>("/chat-completion", {
    company_id: data["companyId"],
    input_message_list: data["inputMessageList"],
  });
}

export function useCreateChatCompletion({
  companyId,
}: {
  companyId: Company["id"];
}) {
  return useSWRMutation(
    `/companies/${companyId}/chat-completions`,
    (_, { arg }: { arg: Pick<CreateChatCompletionParams, "data"> }) =>
      createChatCompletion({
        data: arg["data"],
      }),
    {
      throwOnError: false,
    }
  );
}
