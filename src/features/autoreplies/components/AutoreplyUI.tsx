import { formatDate, formatTime } from "@/utils";
import { Button } from "@/components/button";

import { Autoreply } from "../types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/dialog";
import { ThreadUI } from "./ThreadUI";

interface AutoreplyCardUIProps {
  autoreply: Autoreply;
}

export function AutoreplyCardUI({ autoreply }: AutoreplyCardUIProps) {
  const {
    created_at,
    is_require_action,
    input_message_list,
    output_llm_message_list,
  } = autoreply;
  return (
    <div className="bg-white p-4">
      <div>
        <p className="font-medium">{input_message_list[0].text}</p>
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
        )} | ${formatTime(new Date(created_at))}`}</p>
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
              <ThreadUI
                messageList={input_message_list}
                outputLLMMessageList={output_llm_message_list}
              />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
