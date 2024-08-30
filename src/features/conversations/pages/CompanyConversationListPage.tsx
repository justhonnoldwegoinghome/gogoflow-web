import { useState } from "react";

import { MaxPageSize } from "@/apiClient";
import { PageWrapper } from "@/layouts";
import { Company } from "@/features/companies";

import {
  ConversationListController,
  ConvoType,
  Source,
} from "../components/ConversationListController";
import { CompanyConversationList } from "../components/CompanyConversationList";

interface CompanyConversationListPageProps {
  id: Company["id"];
}

export function CompanyConversationListPage({
  id,
}: CompanyConversationListPageProps) {
  const [source, setSource] = useState<Source>("shopee");
  const [convoType, setConvoType] = useState<ConvoType>("all");
  const [maxPageSize, setPageSize] = useState<MaxPageSize>(10);

  return (
    <PageWrapper>
      <ConversationListController
        source={source}
        changeSource={(s) => setSource(s)}
        convoType={convoType}
        changeConvoType={(ct) => setConvoType(ct)}
        maxPageSize={maxPageSize}
        changePageSize={(ps) => setPageSize(ps)}
      />

      <br />

      <CompanyConversationList
        id={id}
        source={source}
        convoType={convoType}
        maxPageSize={maxPageSize}
      />
    </PageWrapper>
  );
}
