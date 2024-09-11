import _ from "lodash";
import { useState } from "react";

import { Button } from "@/components/button";
import { Company } from "@/features/companies";

import { useCreateTestAutoreply } from "../api/createTestautoreply";
import { OutputLLMMessage, TestMessage } from "../types";
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

  const [testMessageList, setTestMessageList] = useState<TestMessage[]>([]);

  return (
    <div>
      <div className="flex justify-end gap-2 mb-8">
        <CreateTestMessageFormDialog
          onSubmit={(tm) => setTestMessageList([...testMessageList, tm])}
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
                  inputTestMessageList: testMessageList,
                },
              })
              .then((res) => {
                if (res) {
                  setTestMessageList([
                    ...testMessageList,
                    ...res.data.output_llm_message_list.map(
                      outputLLMMessageToTestMessage
                    ),
                  ]);
                }
              })
          }
          variant={testMessageList.length === 0 ? "secondary" : "default"}
          disabled={Boolean(testMessageList.length === 0)}
          isLoading={createTestAutoreplyMutation.isMutating}
        >
          <p>Run</p>
        </Button>
        <Button
          variant="outline"
          onClick={() => {
            setTestMessageList([]);
          }}
        >
          Reset
        </Button>
      </div>

      <TestThreadUI testMessageList={testMessageList} />
    </div>
  );
}

function outputLLMMessageToTestMessage(o: OutputLLMMessage): TestMessage {
  return { sender_role: "seller", text: o.content, reference: null };
}
