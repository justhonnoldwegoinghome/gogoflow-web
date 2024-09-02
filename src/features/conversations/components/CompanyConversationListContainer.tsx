import { useState } from "react";

import { MaxPageSize } from "@/apiClient";
import { Company } from "@/features/companies";

import {
  ConversationListController,
  ConvoType,
  Source,
} from "./ConversationListController";
import { CompanyConversationList } from "./CompanyConversationList";

interface CompanyConversationListContainerProps {
  id: Company["id"];
}

export function CompanyConversationListContainer({
  id,
}: CompanyConversationListContainerProps) {
  const [source, setSource] = useState<Source>("shopee");
  const [convoType, setConvoType] = useState<ConvoType>("all");
  const [maxPageSize, setPageSize] = useState<MaxPageSize>(10);

  return (
    <div>
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
    </div>
  );
}
