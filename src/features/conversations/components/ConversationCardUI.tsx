import Link from "next/link";
import { useRouter } from "next/router";

import { formatDate, formatTime } from "@/utils";
import { Avatar, AvatarImage } from "@/components/avatar";

import { Conversation } from "../types";

interface ConversationCardUIProps {
  conversation: Conversation;
}

export function ConversationCardUI({ conversation }: ConversationCardUIProps) {
  const { asPath } = useRouter();

  const { id, source, last_message_at, buyer_name, buyer_avatar, num_unread } =
    conversation;

  return (
    <Link
      href={`${asPath}/${id}/messages`}
      className="bg-white flex gap-2 justify-between items-center p-4 rounded-lg border"
    >
      <div className="flex gap-2 items-center">
        <Avatar>
          {buyer_avatar ? (
            <AvatarImage src={buyer_avatar} />
          ) : (
            <span className="bg-gradient-to-b from-white to-gray-300 block w-10 h-10" />
          )}
        </Avatar>
        <p>{buyer_name}</p>
      </div>
      <br />
      <div className="flex flex-col items-end gap-4">
        <p className="text-sm text-muted-foreground w-fit ml-auto">{`${formatDate(
          new Date(last_message_at)
        )} | ${formatTime(new Date(last_message_at))}`}</p>
        {num_unread > 0 ? (
          <span className="text-sm bg-primary text-primary-foreground w-fit px-2 py-1 rounded">
            {num_unread}
          </span>
        ) : (
          <span className="text-sm bg-secondary text-secondary-foreground w-fit px-2 py-1 rounded">
            {num_unread}
          </span>
        )}
      </div>
    </Link>
  );
}
