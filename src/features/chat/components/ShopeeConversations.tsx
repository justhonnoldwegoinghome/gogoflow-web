import Link from "next/link";

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
          <div>
            <p>{c.processed.id}</p>
            <p>{c.processed.last_message_at}</p>
            <p>{c.processed.buyer_name}</p>
            <p>{c.processed.num_unread}</p>
            <img
              src={
                c.processed.buyer_avatar ||
                "https://images.unsplash.com/photo-1557683304-673a23048d34?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGdyYWRpZW50fGVufDB8fDB8fHww"
              }
              className="w-8 h-8 rounded-full"
              alt="buyer_avatar"
            />
          </div>
          <br />
          <div>
            <button
              onClick={() => console.log(c.raw)}
              className="text-blue-500"
            >
              Log raw convo
            </button>
            <Link
              href={`/c/${companyId}/sc/${c.processed.id}/messages`}
              className="block text-blue-500"
            >
              View messages
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
