import { useRouter } from "next/router";

import { AuthenticatedLayout } from "@/layouts";
import { Company } from "@/features/companies";
import { LoggedIn } from "@/features/authentication";
import { Conversation } from "@/features/conversations";
import { ConversationMessageList, SendMessage } from "@/features/messages";

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
          <div className="h-full flex flex-col relative">
            <div className="flex-1 overflow-auto">
              <ConversationMessageList
                companyId={id}
                conversationId={convoId}
              />
            </div>

            <div className="absolute bottom-0 inset-x-0">
              <SendMessage companyId={id} conversationId={convoId} />
            </div>
          </div>
        </AuthenticatedLayout>
      )}
    </LoggedIn>
  );
}
