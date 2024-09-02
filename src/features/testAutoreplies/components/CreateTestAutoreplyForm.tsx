import _ from "lodash";
import { useState } from "react";

import { Button } from "@/components/button";
import { Company } from "@/features/companies";

import { useCreateTestAutoreply } from "../api/createTestautoreply";
import { TestAutoreply, TestMessage } from "../types";
import { CreateTestMessageFormDialog } from "./CreateTestMessageFormDialog";
import { TestThreadUI } from "./TestThreadUI";

interface CreateTestAutoreplyFormProps {
  assistantId: Company["id"];
  source: "shopee";
}

export function CreateTestAutoreplyForm({
  assistantId,
  source,
}: CreateTestAutoreplyFormProps) {
  const createTestAutoreplyMutation = useCreateTestAutoreply({
    assistantId,
  });

  const [inputTestMessageList, setInputTestMessageList] = useState<
    TestMessage[]
  >([]);

  const [response, setResponse] = useState<TestAutoreply | null>(null);

  return (
    <div>
      <div className="flex justify-end gap-2 mb-8">
        <CreateTestMessageFormDialog
          onSubmit={(tm) =>
            setInputTestMessageList([...inputTestMessageList, tm])
          }
        >
          {(openDialog) => (
            <Button variant="secondary" onClick={openDialog}>
              <p>Add message</p>
            </Button>
          )}
        </CreateTestMessageFormDialog>
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
          <p>Run</p>
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            setInputTestMessageList([]);
            setResponse(null);
          }}
        >
          Reset
        </Button>
      </div>

      <TestThreadUI
        testMessageList={inputTestMessageList}
        outputLLMMessageList={response ? response.output_llm_message_list : []}
      />
    </div>
  );
}
