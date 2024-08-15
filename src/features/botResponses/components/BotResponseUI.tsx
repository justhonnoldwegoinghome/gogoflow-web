import _ from "lodash";
import Link from "next/link";

import { formatDate, formatTime } from "@/utils";

import { BotResponse } from "../types";

interface BotResponseUI {
  botResponse: BotResponse;
}

export function BotResponseUI({ botResponse }: BotResponseUI) {
  return (
    <div className="p-4 rounded-lg border">
      <div className="flex flex-col gap-4">
        {botResponse.output_llm_message_list.map((o, i) => (
          <p key={i}>{o.content}</p>
        ))}
      </div>
      <br />
      {botResponse.is_require_action && (
        <p className="text-sm bg-primary text-primary-foreground w-fit rounded-full px-2">
          Action required
        </p>
      )}
      <br />
      <Link
        className="text-sm text-muted-foreground hover:underline underline-offset-2"
        href={`/c/${botResponse.company_id}/conversations/${botResponse.conversation_id}/messages`}
      >
        {`Conversation ID: ${botResponse.conversation_id}`}
      </Link>
      <br />
      <p className="text-sm text-muted-foreground">{`${formatDate(
        new Date(botResponse.created_at)
      )} | ${formatTime(new Date(botResponse.created_at))}`}</p>
    </div>
  );
}
