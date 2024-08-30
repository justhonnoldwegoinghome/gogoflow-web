import _ from "lodash";
import { FlaskConical, Plus } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/button";
import { Company } from "@/features/companies";

import { useCreateTestAutoreply } from "../api/createTestautoreply";
import { TestAutoreply, TestMessage } from "../types";
import { CreateTestMessageFormDialog } from "./CreateTestMessageFormDialog";

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
    <div className="h-[70vh] flex flex-col">
      <div className="flex justify-end gap-2 mb-8">
        <CreateTestMessageFormDialog
          onSubmit={(tm) =>
            setInputTestMessageList([...inputTestMessageList, tm])
          }
        >
          {(openDialog) => (
            <Button variant="secondary" onClick={openDialog}>
              <Plus className="mr-3" size={16} />
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
          <FlaskConical className="mr-3" size={16} />
          <p>Run test</p>
        </Button>
      </div>
      <div className="flex-1 overflow-auto">
        <div className="flex flex-col gap-4">
          {inputTestMessageList.map((m, i) =>
            m.sender_role === "buyer" ? (
              <div
                key={i}
                className="p-3 border border-primary rounded-xl mr-24"
              >
                <p>{m.text}</p>
                {m.reference && (
                  <div className="text-sm text-muted-foreground">
                    <p>{`Reference type: ${m.reference.type}`}</p>
                    <p>{`Reference ID: ${m.reference.id}`}</p>
                  </div>
                )}
              </div>
            ) : (
              <div key={i} className="p-3 bg-secondary rounded-xl ml-24">
                <p>{m.text}</p>
                {m.reference && (
                  <div className="text-sm text-muted-foreground">
                    <p>{`Reference type: ${m.reference.type}`}</p>
                    <p>{`Reference ID: ${m.reference.id}`}</p>
                  </div>
                )}
              </div>
            )
          )}
        </div>
      </div>

      <div className="border-t pt-2">
        <p className="mb-2">Test output:</p>
        <div className="h-[120px] overflow-auto">
          <div className="h-full">
            {response && (
              <div className="flex flex-col gap-4">
                {response.output_llm_message_list.map((o, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-lg bg-primary text-primary-foreground"
                  >
                    <p>{o.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
