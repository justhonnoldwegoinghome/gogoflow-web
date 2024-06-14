import { Company } from "@/features/companies";

import { useShopeeConversations } from "../api/getShopeeConversations";

interface ShopeeConversationsProps {
  companyId: Company["id"];
}

export function ShopeeConversations({ companyId }: ShopeeConversationsProps) {
  const shopeeConversationsQuery = useShopeeConversations({
    companyId,
    pageSize: 20,
    convoType: "all",
  });

  if (!shopeeConversationsQuery.data) return <div></div>;

  return (
    <div className="flex flex-col items-start gap-8">
      {shopeeConversationsQuery.data.results.map((c, i) => (
        <div key={i} className="border">
          <p>{`Conversation id: ${c.conversation_id}`}</p>
          <p>{`Latest message from id: ${c.latest_message_from_id}`}</p>
        </div>
      ))}
    </div>
  );
}
