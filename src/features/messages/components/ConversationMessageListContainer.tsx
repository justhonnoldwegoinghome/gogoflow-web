import _ from "lodash";

import { Spinner } from "@/components/spinner";
import { Company } from "@/features/companies";

import { useConversationMessageList } from "../api/getConversationMessageList";
import { ConversationMessageList } from "./ConversationMessageList";
import { SendMessage } from "./SendMessage";

interface ConversationMessageListContainerProps {
  companyId: Company["id"];
  conversationId: string;
}

export function ConversationMessageListContainer({
  companyId,
  conversationId,
}: ConversationMessageListContainerProps) {
  const conversationMessageListQuery = useConversationMessageList({
    companyId,
    conversationId,
    source: "shopee",
    maxPageSize: 50,
    pageToken: null,
  });

  if (!conversationMessageListQuery.data) return <Spinner />;

  return (
    <div>
      <ConversationMessageList
        companyId={companyId}
        conversationId={conversationId}
      />

      <br />

      <SendMessage companyId={companyId} conversationId={conversationId} />
    </div>
  );
}
