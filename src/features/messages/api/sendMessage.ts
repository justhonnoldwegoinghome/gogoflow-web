import useSWRMutation from "swr/mutation";

import { post } from "@/apiClient";
import { Company } from "@/features/companies";
import { Conversation } from "@/features/conversations";

import { Message } from "../types";

interface SendMessageParams {
  conversationId: Conversation["id"];
  data: {
    source: Message["source"];
    companyId: Company["id"];
    text: string;
  };
}

export function sendMessage({ conversationId, data }: SendMessageParams) {
  return post<any>(`/conversations/${conversationId}:send-message`, {
    source: data.source,
    company_id: data.companyId,
    text: data.text,
  });
}

export function useSendMessage({
  companyId,
  conversationId,
}: {
  companyId: Company["id"];
  conversationId: Conversation["id"];
}) {
  return useSWRMutation(
    `/companies/${companyId}/conversations/${conversationId}/messages`,
    (_, { arg }: { arg: SendMessageParams }) =>
      sendMessage({
        conversationId,
        data: arg["data"],
      }),
    {
      throwOnError: false,
    }
  );
}
