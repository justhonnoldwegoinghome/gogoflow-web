import { useRouter } from "next/router";

import { Company } from "@/features/companies";
import { LoggedIn } from "@/features/authentication";
import { AuthenticatedLayout } from "@/layouts";
import { CompanyAutoreplyListPage } from "@/features/autoreplies";
import { Assistant } from "@/features/assistants";

export default function Page() {
  const { query } = useRouter();
  let { id, botId } = query;

  if (!id || !botId) return <div />;

  id = id as Company["id"];
  botId = botId as Assistant["id"];

  // TODO: change to AssistantAutoreplyListPage

  return (
    <LoggedIn>
      {(userId) => (
        <AuthenticatedLayout
          userId={userId}
          selectedCompanyId={id}
          companyTab="bots"
        >
          <CompanyAutoreplyListPage id={id} />
        </AuthenticatedLayout>
      )}
    </LoggedIn>
  );
}
