import { useRouter } from "next/router";

import { AuthenticatedLayout, PagePadding } from "@/layouts";
import { LoggedIn } from "@/features/authentication";
import { Assistant, AssistantSubpageBreadcrumb } from "@/features/assistants";
import { Company } from "@/features/companies";
import { CreateTestAutoreplyForm } from "@/features/testAutoreplies";

export default function Page() {
  const { query } = useRouter();
  let { id, assistantId } = query;

  if (!id || !assistantId) return <div />;

  id = id as Company["id"];
  assistantId = assistantId as Assistant["id"];

  return (
    <LoggedIn>
      {(userId) => (
        <AuthenticatedLayout
          userId={userId}
          selectedCompanyId={id}
          companyTab="assistants"
        >
          <PagePadding>
            <div className="w-full max-w-screen-tablet mx-auto">
              <AssistantSubpageBreadcrumb
                id={assistantId}
                subpageLabel="Playground"
              />
              <br />
              <br />
              <CreateTestAutoreplyForm
                assistantId={assistantId}
                source="shopee"
              />
            </div>
          </PagePadding>
        </AuthenticatedLayout>
      )}
    </LoggedIn>
  );
}
