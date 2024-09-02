import { useRouter } from "next/router";

import { Company } from "@/features/companies";
import { LoggedIn } from "@/features/authentication";
import { ConversationMessageListContainer } from "@/features/messages";
import { AuthenticatedLayout, PageWrapper } from "@/layouts";
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
          <PageWrapper>
            <ConversationMessageListContainer
              companyId={id}
              conversationId={convoId}
            />
          </PageWrapper>
        </AuthenticatedLayout>
      )}
    </LoggedIn>
  );
}
