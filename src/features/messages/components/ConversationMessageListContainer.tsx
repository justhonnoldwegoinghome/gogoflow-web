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
    <div className="h-full flex flex-col relative">
      <div className="flex-1 overflow-auto">
        <ConversationMessageList
          companyId={companyId}
          conversationId={conversationId}
        />
      </div>

      <div className="absolute bottom-0 inset-x-0">
        <SendMessage companyId={companyId} conversationId={conversationId} />
      </div>
    </div>
  );
}
