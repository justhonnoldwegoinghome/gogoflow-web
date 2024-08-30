import { useRouter } from "next/router";

import { Company } from "@/features/companies";
import { LoggedIn } from "@/features/authentication";
import { ConversationMessageListPage } from "@/features/messages";
import { AuthenticatedLayout } from "@/layouts";
import { Conversation } from "@/features/conversations";

export default function Page() {
  const query = useRouter().query;
  let { id, convoId } = query;

  if (!id || !convoId) return <div />;

  id = id as Company["id"];
  convoId = convoId as Conversation["id"];

  return (
    <LoggedIn>
      {(userId) => (
        <AuthenticatedLayout
          userId={userId}
          selectedCompanyId={id}
          companyTab="conversations"
        >
          <ConversationMessageListPage
            companyId={id}
            conversationId={convoId}
          />
        </AuthenticatedLayout>
      )}
    </LoggedIn>
  );
}
