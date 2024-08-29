import _ from "lodash";
import { Plus, Trash } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/button";
import { Company } from "@/features/companies";
import { PageWrapper } from "@/layouts";

import { CreateTestMessageFormDialog } from "../components/CreateTestMessageFormDialog";
import { TestMessageCardUI } from "../components/TestMessageCardUI";
import { CreateTestAutoreplyForm } from "../components/CreateTestAutoreplyForm";
import { TestMessage } from "../types";

interface CreateTestAutoreplyPageProps {
  assistantId: Company["id"];
  source: "shopee";
}

export function CreateTestAutoreplyPage({
  assistantId,
  source,
}: CreateTestAutoreplyPageProps) {
  const [inputTestMessageList, setInputTestMessageList] = useState<
    TestMessage[]
  >([]);

  return (
    <PageWrapper>
      <div className="flex flex-col gap-8">
        <div className="flex gap-2 justify-end">
          <CreateTestMessageFormDialog
            onSubmit={(t) =>
              setInputTestMessageList([...inputTestMessageList, t])
            }
          >
            {(openDialog) => (
              <Button size="sm" onClick={openDialog}>
                <div className="flex gap-2 items-center">
                  <Plus size={16} />
                  <p>Add message</p>
                </div>
              </Button>
            )}
          </CreateTestMessageFormDialog>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setInputTestMessageList([])}
          >
            <div className="flex gap-2 items-center">
              <Trash size={16} />
              <p>Clear messages</p>
            </div>
          </Button>
        </div>

        <div>
          <div className="flex flex-col gap-4">
            {inputTestMessageList.map((tm, i) => (
              <TestMessageCardUI key={i} testMessage={tm} />
            ))}
          </div>
        </div>

        <CreateTestAutoreplyForm
          assistantId={assistantId}
          source={source}
          inputTestMessageList={inputTestMessageList}
        />
      </div>
    </PageWrapper>
  );
}
