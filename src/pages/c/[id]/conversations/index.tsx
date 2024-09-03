import { useRouter } from "next/router";

import { AuthenticatedLayout, PagePadding } from "@/layouts";
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
          <PagePadding>
            <div className="w-full max-w-screen-tablet mx-auto">
              <CompanyConversationListContainer id={id} />
            </div>
          </PagePadding>
        </AuthenticatedLayout>
      )}
    </LoggedIn>
  );
}
