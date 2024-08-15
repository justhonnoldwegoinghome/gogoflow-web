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
        {botResponse.output_text_list.map((o, i) => (
          <p key={i}>{o}</p>
        ))}
      </div>
      <p>
        {botResponse.is_require_action
          ? "Requires action"
          : "No action required"}
      </p>
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
