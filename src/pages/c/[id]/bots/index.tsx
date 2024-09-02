import { useRouter } from "next/router";

import { AuthenticatedLayout } from "@/layouts";
import { LoggedIn } from "@/features/authentication";
import { Company } from "@/features/companies";
import { CompanyAssistantList } from "@/features/assistants";

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
          <CompanyAssistantList id={id} />
        </AuthenticatedLayout>
      )}
    </LoggedIn>
  );
}
