import { useRouter } from "next/router";

import { AuthenticatedLayout, PageWrapper } from "@/layouts";
import { Company } from "@/features/companies";
import { LoggedIn } from "@/features/authentication";
import { CompanyConversationListContainer } from "@/features/conversations";

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
          companyTab="conversations"
        >
          <PageWrapper>
            <CompanyConversationListContainer id={id} />
          </PageWrapper>
        </AuthenticatedLayout>
      )}
    </LoggedIn>
  );
}
