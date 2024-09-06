import { useRouter } from "next/router";

import { AuthenticatedLayout, PagePadding } from "@/layouts";
import { CreateAssistantForm } from "@/features/assistants";
import { LoggedIn } from "@/features/authentication";
import { Company } from "@/features/companies";

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
          companyTab="assistants"
        >
          <PagePadding>
            <div className="w-full max-w-screen-tablet mx-auto">
              <CreateAssistantForm companyId={id} />
            </div>
          </PagePadding>
        </AuthenticatedLayout>
      )}
    </LoggedIn>
  );
}
