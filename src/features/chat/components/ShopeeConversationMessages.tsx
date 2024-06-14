import { Company } from "@/features/companies";

import { useShopeeConversationMessages } from "../api/getShopeeConversationMessages";

interface ShopeeConversationMessagesProps {
  companyId: Company["id"];
  conversationId: string;
}

export function ShopeeConversationMessages({
  companyId,
  conversationId,
}: ShopeeConversationMessagesProps) {
  const shopeeConversationMessagesQuery = useShopeeConversationMessages({
    companyId,
    conversationId,
  });

  if (!shopeeConversationMessagesQuery.data) return <div></div>;

  return (
    <div>
      <h1 className="font-bold">Messages</h1>
      <div className="flex flex-col items-start gap-8">
        {shopeeConversationMessagesQuery.data.results.map((m, i) => (
          <div key={i} className="border">
            <p>{`Message id: ${m.message_id}`}</p>
            <button onClick={() => console.log(m)}>Log msg</button>
          </div>
        ))}
      </div>
      <br />

      <button className="p-3 bg-green-200">Generate response</button>
    </div>
  );
}
