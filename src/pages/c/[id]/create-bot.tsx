import { useRouter } from "next/router";

import { CreateAssistantPage } from "@/features/assistants";
import { LoggedIn } from "@/features/authentication";
import { Company } from "@/features/companies";
import { AuthenticatedLayout } from "@/layouts";

export default function Page() {
  const { query } = useRouter();
  let { id } = query;

  if (!id) return <div />;

  id = id as Company["id"];

  return (
    <LoggedIn>
      {(userId) => (
        <AuthenticatedLayout
          userId={userId}
          selectedCompanyId={id}
          companyTab="bots"
        >
          <CreateAssistantPage companyId={id} />
        </AuthenticatedLayout>
      )}
    </LoggedIn>
  );
}
