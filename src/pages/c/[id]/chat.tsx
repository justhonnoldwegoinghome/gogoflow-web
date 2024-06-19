import { useRouter } from "next/router";

import { Company } from "@/features/companies";
import { LoggedIn } from "@/features/authentication";
import { CompanyChatFiles } from "@/features/files";
import { ChatSettings, Conversations } from "@/features/chat";

export default function CompanyChatPage() {
  const query = useRouter().query;
  let { id } = query;

  if (!id) return <div />;

  id = id as Company["id"];

  return (
    <LoggedIn>
      {(userId) => (
        <div>
          <h2 className="font-bold">Chat settings</h2>
          <ChatSettings companyId={id} />
          <h2 className="font-bold">Files</h2>
          <CompanyChatFiles id={id} />
          <h2 className="font-bold">Shopee conversations</h2>
          <Conversations companyId={id} />
        </div>
      )}
    </LoggedIn>
  );
}
