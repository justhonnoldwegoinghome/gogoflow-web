import { useRouter } from "next/router";

import { format } from "@/utils/format";
import { Button } from "@/components/button";

import { Conversation } from "../types";

interface ConversationCardUIProps {
  conversation: Conversation;
}

export function ConversationCardUI({ conversation }: ConversationCardUIProps) {
  const { push, asPath } = useRouter();

  const { id, source, last_message_at, buyer_name, buyer_avatar, num_unread } =
    conversation;

  return (
    <div className="flex gap-2 justify-between p-4 rounded-lg border">
      <div className="flex flex-col gap-4">
        <div className="flex gap-2 items-center">
          <img
            src={
              buyer_avatar ||
              "https://images.unsplash.com/photo-1557683304-673a23048d34?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGdyYWRpZW50fGVufDB8fDB8fHww"
            }
            className="w-8 h-8 rounded-full shrink-0"
            alt="buyer_avatar"
          />
          <p>{buyer_name}</p>
        </div>
        <div className="text-gray-600 text-sm">
          <p>{`${format.date(new Date(last_message_at))} | ${format.time(
            new Date(last_message_at)
          )}`}</p>
          <p>{`Unread count: ${num_unread}`}</p>
        </div>
      </div>
      <br />
      <div>
        <Button onClick={() => push(`${asPath}/${id}/messages`)} variant="link">
          View messages
        </Button>
      </div>
    </div>
  );
}
