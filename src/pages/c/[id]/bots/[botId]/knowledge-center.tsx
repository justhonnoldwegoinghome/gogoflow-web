import { useRouter } from "next/router";

import { AuthenticatedLayout, PageWrapper } from "@/layouts";
import { LoggedIn } from "@/features/authentication";
import { Company } from "@/features/companies";
import { Assistant, AssistantSubpageBreadcrumb } from "@/features/assistants";
import { AssistantFileList, UploadFiles } from "@/features/files";

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
            <AssistantSubpageBreadcrumb
              id={botId}
              subpageLabel="Knowledge center"
            />
            <br />
            <br />
            <AssistantFileList id={botId} />
            <br />
            <br />
            <UploadFiles assistantId={botId} />
          </PageWrapper>
        </AuthenticatedLayout>
      )}
    </LoggedIn>
  );
}
