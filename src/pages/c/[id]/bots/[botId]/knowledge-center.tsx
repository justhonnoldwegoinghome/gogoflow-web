import { useRouter } from "next/router";

import { AuthenticatedLayout, PagePadding } from "@/layouts";
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
          <PagePadding>
            <div className="w-full max-w-screen-tablet mx-auto">
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
            </div>
          </PagePadding>
        </AuthenticatedLayout>
      )}
    </LoggedIn>
  );
}
