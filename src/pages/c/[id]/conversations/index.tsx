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
    <CompanyLayout id={id} tab="conversations">
      <LoggedIn>
        {(userId) => (
          <div>
            <div className="p-4 border-b">
              <p className="text-2xl  font-semibold">Conversations</p>
            </div>
            <div className="p-4">
              <CompanyConversationListContainer id={id} />
            </div>
          </div>
        )}
      </LoggedIn>
    </CompanyLayout>
  );
}
