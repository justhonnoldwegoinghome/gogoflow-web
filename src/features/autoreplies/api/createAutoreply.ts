import useSWRMutation from "swr/mutation";

import { post } from "@/apiClient";
import { Company } from "@/features/companies";
import { Message } from "@/features/messages";

import { Autoreply } from "../types";

interface CreateAutoreplyParams {
  data: {
    companyId: Company["id"];
    source: "shopee";
    inputMessageList: Message[];
  };
}

export function createAutoreply({ data }: CreateAutoreplyParams) {
  return post<Autoreply>("/autoreplies", {
    company_id: data["companyId"],
    source: data["source"],
    input_message_list: data["inputMessageList"],
  });
}

export function useCreateAutoreply({
  companyId,
}: {
  companyId: Company["id"];
}) {
  return useSWRMutation(
    `/companies/${companyId}/autoreplies`,
    (_, { arg }: { arg: Pick<CreateAutoreplyParams, "data"> }) =>
      createAutoreply({
        data: arg["data"],
      }),
    {
      throwOnError: false,
    }
  );
}
