import { useRouter } from "next/router";

import { Company } from "@/features/companies";
import { LoggedIn } from "@/features/authentication";
import { AuthenticatedLayout } from "@/layouts";
import { CompanyAutoreplyListPage } from "@/features/autoreplies";

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
          companyTab="bot-logs"
        >
          <CompanyAutoreplyListPage id={id} />
        </AuthenticatedLayout>
      )}
    </LoggedIn>
  );
}
