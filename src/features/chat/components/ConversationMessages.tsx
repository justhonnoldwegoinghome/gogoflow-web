import _ from "lodash";

import { Company } from "@/features/companies";

import { useConversationMessages } from "../api/getConversationMessages";
import { CreateChatCompletionForm } from "./CreateChatCompletionForm";

interface ShopeeConversationMessagesProps {
  companyId: Company["id"];
  conversationId: string;
}

export function ConversationMessages({
  companyId,
  conversationId,
}: ShopeeConversationMessagesProps) {
  const conversationMessagesQuery = useConversationMessages({
    companyId,
    conversationId,
    source: "shopee",
    pageSize: 60,
    nextPageToken: null,
  });

  if (!conversationMessagesQuery.data) return <div></div>;

  return (
    <div>
      <h1 className="font-bold">Messages</h1>
      <div className="flex flex-col items-start gap-8">
        {_.orderBy(
          conversationMessagesQuery.data.results,
          "sent_at",
          "asc"
        ).map((m, i) => (
          <div key={i} className="border">
            <div>
              <p>{`Sent at: ${m.sent_at}`}</p>
              <p>{`Sent by: ${m.sender_role}`}</p>
              <br />
              <p>{`Text: ${m.text}`}</p>
            </div>
          </div>
        ))}
      </div>
      <br />

      <CreateChatCompletionForm
        companyId={companyId}
        inputMessageList={conversationMessagesQuery.data.results}
      />
    </div>
  );
}
