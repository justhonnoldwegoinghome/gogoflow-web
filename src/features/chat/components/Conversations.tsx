import Link from "next/link";

import { Company } from "@/features/companies";

import { useConversations } from "../api/getConversations";

interface ConversationsProps {
  companyId: Company["id"];
}

export function Conversations({ companyId }: ConversationsProps) {
  const conversationsQuery = useConversations({
    companyId,
    source: "shopee",
    pageSize: 20,
    convoType: "all",
  });

  if (!conversationsQuery.data) return <div></div>;

  return (
    <div className="flex flex-col items-start gap-8">
      {conversationsQuery.data.results.map((c, i) => (
        <div key={i} className="border">
          <div>
            <p>{c.id}</p>
            <p>{c.source}</p>
            <p>{c.last_message_at}</p>
            <p>{c.buyer_name}</p>
            <p>{c.num_unread}</p>
            <img
              src={
                c.buyer_avatar ||
                "https://images.unsplash.com/photo-1557683304-673a23048d34?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGdyYWRpZW50fGVufDB8fDB8fHww"
              }
              className="w-8 h-8 rounded-full"
              alt="buyer_avatar"
            />
          </div>
          <br />
          <div>
            <Link
              href={`/c/${companyId}/sc/${c.id}/messages`}
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
