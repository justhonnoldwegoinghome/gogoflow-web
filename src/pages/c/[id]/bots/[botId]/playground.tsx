import { useRouter } from "next/router";

import { AuthenticatedLayout, PageWrapper } from "@/layouts";
import { LoggedIn } from "@/features/authentication";
import { Assistant, AssistantSubpageBreadcrumb } from "@/features/assistants";
import { Company } from "@/features/companies";

export default function Page() {
  const { query } = useRouter();
  let { id, botId } = query;

  if (!id || !botId) return <div />;

  id = id as Company["id"];
  botId = botId as Assistant["id"];

  return (
    <LoggedIn>
      {(userId) => (
        <AuthenticatedLayout
          userId={userId}
          selectedCompanyId={id}
          companyTab="bots"
        >
          <PageWrapper>
            <AssistantSubpageBreadcrumb id={botId} subpageLabel="Playground" />
            <br />
            <br />
            <div>Coming soon</div>
          </PageWrapper>
        </AuthenticatedLayout>
      )}
    </LoggedIn>
  );
}
