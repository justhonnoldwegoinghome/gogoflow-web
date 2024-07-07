import _ from "lodash";
import { useState } from "react";

import { Textarea } from "@/components/form";
import { Button } from "@/components/button";
import { Company } from "@/features/companies";

import { useSendMessage } from "../api/sendMessage";
import { Conversation } from "../types";

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
    <div>
      <p className="mb-2 font-semibold">Response:</p>
      <Textarea value={text} onChange={(e) => setText(e.target.value)} />
      <br />
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
        Send message
      </Button>
    </div>
  );
}
