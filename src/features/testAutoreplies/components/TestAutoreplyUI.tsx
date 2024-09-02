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
  return (
    <div className="bg-secondary p-4 rounded-lg flex flex-col gap-4">
      <div>
        <p className="font-medium">Bot ID</p>
        <p className="text-muted-foreground">{testAutoreply.assistant_id}</p>
      </div>
      <div>
        <p className="font-medium">Timestamp</p>
        <p className="text-muted-foreground">{`${formatDate(
          new Date(testAutoreply.created_at)
        )} | ${formatTime(new Date(testAutoreply.created_at))}`}</p>
      </div>
      <div>
        <p className="font-medium">Action required</p>
        <p className="text-muted-foreground">
          {testAutoreply.is_require_action ? "Yes" : "No"}
        </p>
      </div>

      <div className="ml-auto">
        <Dialog>
          <DialogTrigger asChild>
            <Button>View thread</Button>
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
