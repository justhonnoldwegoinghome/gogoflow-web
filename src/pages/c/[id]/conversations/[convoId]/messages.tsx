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
          <div className="pt-8 px-4 pb-8 h-full w-full max-w-screen-tablet mx-auto flex flex-col gap-8 relative">
            <div className="flex-1 overflow-auto">
              <ConversationMessageList
                companyId={id}
                conversationId={convoId}
              />
            </div>

            <div>
              <SendMessage companyId={id} conversationId={convoId} />
            </div>
          </div>
        </AuthenticatedLayout>
      )}
    </LoggedIn>
  );
}
