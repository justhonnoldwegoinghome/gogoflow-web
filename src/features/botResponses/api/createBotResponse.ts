import useSWRMutation from "swr/mutation";

import { post } from "@/apiClient";
import { Company } from "@/features/companies";
import { Message } from "@/features/messages";

import { BotResponse } from "../types";

interface CreateBotResponseParams {
  data: {
    companyId: Company["id"];
    source: "shopee";
    inputMessageList: Message[];
  };
}

export function createBotResponse({ data }: CreateBotResponseParams) {
  return post<BotResponse>("/bot-responses", {
    company_id: data["companyId"],
    source: data["source"],
    input_message_list: data["inputMessageList"],
  });
}

export function useCreateBotResponse({
  companyId,
}: {
  companyId: Company["id"];
}) {
  return useSWRMutation(
    `/companies/${companyId}/bot-responses`,
    (_, { arg }: { arg: Pick<CreateBotResponseParams, "data"> }) =>
      createBotResponse({
        data: arg["data"],
      }),
    {
      throwOnError: false,
    }
  );
}
