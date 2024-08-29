import _ from "lodash";

import { PageWrapper } from "@/layouts";
import { Spinner } from "@/components/spinner";
import { Company } from "@/features/companies";

import { useConversationMessageList } from "../api/getConversationMessageList";
import { ConversationMessageList } from "../components/ConversationMessageList";
import { SendMessage } from "../components/SendMessage";

interface ConversationMessageListPageProps {
  companyId: Company["id"];
  conversationId: string;
}

export function ConversationMessageListPage({
  companyId,
  conversationId,
}: ConversationMessageListPageProps) {
  const conversationMessageListQuery = useConversationMessageList({
    companyId,
    conversationId,
    source: "shopee",
    maxPageSize: 50,
    pageToken: null,
  });

  if (!conversationMessageListQuery.data) return <Spinner />;

  return (
    <PageWrapper>
      <ConversationMessageList
        companyId={companyId}
        conversationId={conversationId}
      />

      <br />

      <SendMessage companyId={companyId} conversationId={conversationId} />
    </PageWrapper>
  );
}
