import { useRouter } from "next/router";

import { Company } from "@/features/companies";
import { LoggedIn } from "@/features/authentication";
import { CompanyConversationListContainer } from "@/features/conversations";
import { CompanyLayout } from "@/layouts";

export default function Page() {
  const { query } = useRouter();
  let { id } = query;

  if (!id) return <div />;

  id = id as Company["id"];

  return (
    <LoggedIn>
      {(userId) => (
        <CompanyLayout
          id={id}
          tab="conversations"
          header={{ title: "Conversations" }}
        >
          <div className="p-6 overflow-auto">
            <CompanyConversationListContainer id={id} />
          </div>
        </CompanyLayout>
      )}
    </LoggedIn>
  );
}
