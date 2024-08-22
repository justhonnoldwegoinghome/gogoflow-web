import _ from "lodash";
import clsx from "clsx";

import { Spinner } from "@/components/spinner";
import { Company } from "@/features/companies";
import { CreateAutoreply } from "@/features/autoreplies";

import { useConversationMessageList } from "../api/getConversationMessageList";
import { MessageCardUI } from "./MessageCardUI";
import { SendMessage } from "./SendMessage";

interface ConversationMessageListProps {
  companyId: Company["id"];
  conversationId: string;
}

export function ConversationMessageList({
  companyId,
  conversationId,
}: ConversationMessageListProps) {
  const conversationMessageListQuery = useConversationMessageList({
    companyId,
    conversationId,
    source: "shopee",
    maxPageSize: 50,
    pageToken: null,
  });

  if (!conversationMessageListQuery.data) return <Spinner />;

  return (
    <div className="max-w-screen-tablet mx-auto">
      <div className="flex flex-col items-start gap-4">
        {_.orderBy(
          conversationMessageListQuery.data.results,
          "sent_at",
          "asc"
        ).map((m) => (
          <div
            key={m.id}
            className={clsx("w-fit", {
              "ml-auto": m.sender_role === "seller",
              "mr-auto": m.sender_role === "buyer",
            })}
          >
            <MessageCardUI message={m} />
          </div>
        ))}
      </div>

      <br />

      <CreateAutoreply
        companyId={companyId}
        source="shopee"
        inputMessageList={conversationMessageListQuery.data.results}
      />

      <br />

      <SendMessage companyId={companyId} conversationId={conversationId} />
    </div>
  );
}
