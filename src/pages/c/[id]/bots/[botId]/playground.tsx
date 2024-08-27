import { useRouter } from "next/router";

import { AuthenticatedLayout } from "@/layouts";
import { LoggedIn } from "@/features/authentication";
import { Assistant } from "@/features/assistants";
import { Company } from "@/features/companies";
import { CreateTestAutoreplyPage } from "@/features/testAutoreplies";

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
          <CreateTestAutoreplyPage assistantId={botId} source="shopee" />
        </AuthenticatedLayout>
      )}
    </LoggedIn>
  );
}
