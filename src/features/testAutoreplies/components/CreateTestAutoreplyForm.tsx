import _ from "lodash";
import { useState } from "react";

import { Button } from "@/components/button";
import { Company } from "@/features/companies";

import { useCreateTestAutoreply } from "../api/createTestautoreply";
import { TestAutoreply, TestMessage } from "../types";
import { TestAutoreplyCardUI } from "./TestAutoreplyUI";

interface CreateTestAutoreplyFormProps {
  assistantId: Company["id"];
  source: "shopee";
  inputTestMessageList: TestMessage[];
}

export function CreateTestAutoreplyForm({
  assistantId,
  source,
  inputTestMessageList,
}: CreateTestAutoreplyFormProps) {
  const createTestAutoreplyMutation = useCreateTestAutoreply({
    assistantId,
  });

  const [response, setResponse] = useState<TestAutoreply | null>(null);

  return (
    <div>
      <div>
        <Button
          onClick={() =>
            createTestAutoreplyMutation
              .trigger({
                data: {
                  assistantId,
                  source,
                  inputTestMessageList,
                },
              })
              .then((res) => res && setResponse(res.data))
          }
          variant={inputTestMessageList.length === 0 ? "secondary" : "default"}
          disabled={inputTestMessageList.length === 0}
          isLoading={createTestAutoreplyMutation.isMutating}
        >
          Ask bot
        </Button>
      </div>

      <br />

      <div>{response && <TestAutoreplyCardUI testAutoreply={response} />}</div>
    </div>
  );
}
