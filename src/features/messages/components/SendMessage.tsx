import _ from "lodash";
import { useState } from "react";

import { Button } from "@/components/button";
import { Company } from "@/features/companies";
import { Conversation } from "@/features/conversations";

import { useSendMessage } from "../api/sendMessage";

interface SendMessageProps {
  companyId: Company["id"];
  conversationId: Conversation["id"];
}

export function SendMessage({ companyId, conversationId }: SendMessageProps) {
  const sendMessageMutation = useSendMessage({
    companyId,
    conversationId,
  });

  const [text, setText] = useState("");

  return (
    <div className="bg-white flex flex-col gap-2">
      <textarea
        className="ring-2 ring-input focus-visible:ring-ring w-full rounded-md px-4 py-2 laptop:shadow-lg focus:outline-none"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button
        disabled={!text}
        isLoading={sendMessageMutation.isMutating}
        onClick={() =>
          sendMessageMutation
            .trigger({
              conversationId,
              data: {
                source: "shopee",
                companyId,
                text,
              },
            })
            .then(() => setText(""))
        }
      >
        Send
      </Button>
    </div>
  );
}
