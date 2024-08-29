import { useRouter } from "next/router";

import { LoggedIn } from "@/features/authentication";
import { Company } from "@/features/companies";
import { AssistantFileListPage } from "@/features/files";
import { AuthenticatedLayout } from "@/layouts";
import { Assistant } from "@/features/assistants";

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
          <AssistantFileListPage id={botId} />
        </AuthenticatedLayout>
      )}
    </LoggedIn>
  );
}
