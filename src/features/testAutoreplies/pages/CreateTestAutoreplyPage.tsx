import _ from "lodash";
import { useState } from "react";

import { Company } from "@/features/companies";
import { PageWrapper } from "@/layouts";

import { CreateTestMessageForm } from "../components/CreateTestMessageForm";
import { CreateTestAutoreplyForm } from "../components/CreateTestAutoreplyForm";
import { TestMessage } from "../types";
import { Bot, MessageCirclePlus, Trash } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/sheet";
import { Button } from "@/components/button";
import { TestMessageCardUI } from "../components/TestMessageCardUI";

interface CreateTestAutoreplyPageProps {
  assistantId: Company["id"];
  source: "shopee";
}

export function CreateTestAutoreplyPage({
  assistantId,
  source,
}: CreateTestAutoreplyPageProps) {
  const [createTestMessageFormIsOpen, setCreateTestMessageFormIsOpen] =
    useState(false);

  const [inputTestMessageList, setInputTestMessageList] = useState<
    TestMessage[]
  >([]);

  return (
    <PageWrapper>
      <div className="flex flex-col gap-8">
        <div className="flex gap-2 justify-end">
          <Sheet
            open={createTestMessageFormIsOpen}
            onOpenChange={setCreateTestMessageFormIsOpen}
          >
            <SheetTrigger asChild>
              <Button variant="secondary" size="sm">
                <div className="flex items-center gap-2">
                  <MessageCirclePlus size={16} strokeWidth={1} />
                  <p>Add message</p>
                </div>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>Add buyer's message</SheetHeader>
              <div className="mt-8">
                <CreateTestMessageForm
                  onSubmit={(t) => {
                    setInputTestMessageList([...inputTestMessageList, t]);
                    setCreateTestMessageFormIsOpen(false);
                  }}
                />
              </div>
            </SheetContent>
          </Sheet>
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
