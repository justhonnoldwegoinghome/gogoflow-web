import { Button } from "@/components/button";
import { Spinner } from "@/components/spinner";
import { Company } from "@/features/companies";

import { useCompanyConversationListInfinite } from "../api/getCompanyConversationList";
import { ConvoType, Source } from "./ConversationListController";
import { ConversationCardUI } from "./ConversationCardUI";

interface CompanyConversationListProps {
  id: Company["id"];
  source: Source;
  convoType: ConvoType;
  maxPageSize: number;
}

export function CompanyConversationList({
  id,
  source,
  convoType,
  maxPageSize,
}: CompanyConversationListProps) {
  const { data, hasEnded, loadMore, isValidating } =
    useCompanyConversationListInfinite({
      id,
      source,
      maxPageSize,
      convoType,
    });

  if (!data) return <Spinner />;

  return (
    <div>
      <div className="flex flex-col gap-6">
        {data.results.map((c, i) => (
          <ConversationCardUI key={i} conversation={c} />
        ))}
      </div>
      <br />
      {hasEnded ? (
        <Button disabled variant="outline">
          End of list
        </Button>
      ) : (
        <Button onClick={loadMore} isLoading={isValidating}>
          Load more
        </Button>
      )}
    </div>
  );
}
