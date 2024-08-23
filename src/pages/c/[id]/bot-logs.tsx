import { useRouter } from "next/router";

import { Company } from "@/features/companies";
import { LoggedIn } from "@/features/authentication";
import { CompanyLayout } from "@/layouts";
import { CompanyAutoreplyListContainer } from "@/features/autoreplies";

export default function Page() {
  const { query } = useRouter();
  let { id } = query;

  if (!id) return <div />;

  id = id as Company["id"];

  return (
    <LoggedIn>
      {(userId) => (
        <CompanyLayout id={id} tab="bot-logs" header={{ title: "Bot logs" }}>
          <div className="p-6">
            <CompanyAutoreplyListContainer id={id} />
          </div>
        </CompanyLayout>
      )}
    </LoggedIn>
  );
}
