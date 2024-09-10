import { formatDate, formatTime } from "@/utils";
import { Button } from "@/components/button";

import { TestAutoreply } from "../types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/dialog";
import { TestThreadUI } from "./TestThreadUI";

interface TestAutoreplyCardUIProps {
  testAutoreply: TestAutoreply;
}

export function TestAutoreplyCardUI({
  testAutoreply,
}: TestAutoreplyCardUIProps) {
  const { created_at, input_test_message_list, is_require_action } =
    testAutoreply;

  return (
    <div className="bg-white p-4">
      <div>
        <p className="font-medium">{input_test_message_list[0].text}</p>
        {is_require_action && (
          <span className="bg-red-100 text-red-600 px-3 py-0.5 rounded-full text-sm">
            Action required
          </span>
        )}
      </div>

      <br />
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">{`${formatDate(
          new Date(created_at)
        )} | ${formatTime(new Date(testAutoreply.created_at))}`}</p>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost">View thread</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Thread</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>

            <div className="h-[80vh] overflow-auto">
              <TestThreadUI
                testMessageList={testAutoreply.input_test_message_list}
                outputLLMMessageList={testAutoreply.output_llm_message_list}
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
