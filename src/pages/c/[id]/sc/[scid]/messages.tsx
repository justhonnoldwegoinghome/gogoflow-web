import { useRouter } from "next/router";

import { Company } from "@/features/companies";
import { LoggedIn } from "@/features/authentication";
import { ShopeeConversationMessages } from "@/features/chat";

export default function Page() {
  const query = useRouter().query;
  let { id, scid } = query;

  if (!id) return <div />;

  id = id as Company["id"];
  scid = scid as string;

  return (
    <LoggedIn>
      {(userId) => (
        <div>
          <ShopeeConversationMessages companyId={id} conversationId={scid} />
        </div>
      )}
    </LoggedIn>
  );
}
