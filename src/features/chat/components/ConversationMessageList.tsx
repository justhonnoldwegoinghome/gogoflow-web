import _ from "lodash";
import clsx from "clsx";

import { Spinner } from "@/components/spinner";
import { TypographyH1 } from "@/components/typography";
import { Company } from "@/features/companies";

import { useConversationMessageList } from "../api/getConversationMessageList";
import { CreateChatCompletion } from "./CreateChatCompletion";
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
      <TypographyH1>Messages</TypographyH1>

      <br />

      <div className="flex flex-col items-start gap-8">
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

      <CreateChatCompletion
        companyId={companyId}
        source="shopee"
        inputMessageList={conversationMessageListQuery.data.results}
      />

      <br />

      <SendMessage companyId={companyId} conversationId={conversationId} />
    </div>
  );
}
