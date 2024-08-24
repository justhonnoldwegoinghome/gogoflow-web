import useSWRMutation from "swr/mutation";

import { post } from "@/apiClient";
import { Assistant } from "@/features/assistants";

import { TestAutoreply, TestMessage } from "../types";

interface CreateTestAutoreplyParams {
  data: {
    assistantId: Assistant["id"];
    source: "shopee";
    inputTestMessageList: TestMessage[];
  };
}

export function createTestAutoreply({ data }: CreateTestAutoreplyParams) {
  return post<TestAutoreply>("/test-autoreplies", {
    assistant_id: data["assistantId"],
    source: data["source"],
    input_test_message_list: data["inputTestMessageList"],
  });
}

export function useCreateTestAutoreply({
  assistantId,
}: {
  assistantId: Assistant["id"];
}) {
  return useSWRMutation(
    `/assistants/${assistantId}/test-autoreplies`,
    (_, { arg }: { arg: Pick<CreateTestAutoreplyParams, "data"> }) =>
      createTestAutoreply({
        data: arg["data"],
      }),
    {
      throwOnError: false,
    }
  );
}
