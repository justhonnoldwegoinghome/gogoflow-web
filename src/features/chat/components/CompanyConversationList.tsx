import { Spinner } from "@/components/spinner";
import { Company } from "@/features/companies";

import { useConversationList } from "../api/getConversationList";
import { ConversationCardUI } from "./ConversationCardUI";
import { TypographyH1 } from "@/components/typography";

interface CompanyConversationListProps {
  id: Company["id"];
}

export function CompanyConversationList({ id }: CompanyConversationListProps) {
  const conversationListQuery = useConversationList({
    companyId: id,
    source: "shopee",
    pageSize: 20,
    convoType: "all",
  });
  if (!conversationListQuery.data) return <Spinner />;

  return (
    <div className="max-w-screen-tablet mx-auto">
      <TypographyH1>Conversations</TypographyH1>
      <br />
      <div className="flex flex-col gap-8">
        {conversationListQuery.data.results.map((c, i) => (
          <ConversationCardUI key={i} conversation={c} />
        ))}
      </div>
    </div>
  );
}
