import _ from "lodash";
import Link from "next/link";

import { formatDate, formatTime } from "@/utils";

import { AssistantResponse } from "../types";

interface AssistantResponseUI {
  botResponse: AssistantResponse;
}

export function AssistantResponseUI({ botResponse }: AssistantResponseUI) {
  return (
    <div className="p-4 rounded-lg border">
      <div className="flex flex-col gap-4">
        <div>
          <span className="font-medium">Bot ID</span>
          <p>{botResponse.assistant_id}</p>
        </div>
        <div>
          <span className="font-medium">Conversation ID</span>
          <Link
            className="block"
            href={`/c/${botResponse.company_id}/conversations/${botResponse.conversation_id}/messages`}
          >
            {botResponse.conversation_id}
          </Link>
        </div>
        <div>
          <span className="font-medium">Timestamp</span>
          <p>{`${formatDate(new Date(botResponse.created_at))} | ${formatTime(
            new Date(botResponse.created_at)
          )}`}</p>
        </div>
        <div>
          <span className="font-medium">Output</span>
          <div className="flex flex-col gap-4">
            {botResponse.output_llm_message_list.map((o, i) => (
              <p key={i}>{o.content}</p>
            ))}
          </div>
        </div>
        <div>
          <span className="font-medium">Action required</span>
          <p>{botResponse.is_require_action ? "Yes" : "No"}</p>
        </div>
      </div>
    </div>
  );
}
