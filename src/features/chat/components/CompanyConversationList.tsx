import { Spinner } from "@/components/spinner";
import { Company } from "@/features/companies";

// import { useConversationList } from "../api/getConversationList";
import { useConversationListInfinite } from "../api/getConversationList";
import { ConversationCardUI } from "./ConversationCardUI";
import { TypographyH1 } from "@/components/typography";
import { Button } from "@/components/button";

interface CompanyConversationListProps {
  id: Company["id"];
}

export function CompanyConversationList({ id }: CompanyConversationListProps) {
  const { data, hasEnded, loadMore } = useConversationListInfinite({
    companyId: id,
    source: "shopee",
    pageSize: 20,
    convoType: "all",
  });

  if (!data) return <Spinner />;

  return (
    <div className="max-w-screen-tablet mx-auto">
      <TypographyH1>Conversations</TypographyH1>
      <br />
      <div className="flex flex-col gap-8">
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
        <Button onClick={loadMore}>Load more</Button>
      )}
    </div>
  );
}
