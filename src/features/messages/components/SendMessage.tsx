import _ from "lodash";
import { useState } from "react";

import { Textarea } from "@/components/form";
import { Button } from "@/components/button";
import { Company } from "@/features/companies";

import { useSendMessage } from "../api/sendMessage";
import { Conversation } from "../../conversations/types";

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
    <div className="bg-white">
      <textarea
        className="ring-2 ring-input focus-visible:ring-ring w-full rounded-lg px-4 py-2 laptop:shadow-lg focus:outline-none"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <br />
      <div className="ml-auto w-fit">
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
    </div>
  );
}
