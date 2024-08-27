import { useRouter } from "next/router";

import { LoggedIn } from "@/features/authentication";
import { Company } from "@/features/companies";
import { CompanyFileListPage } from "@/features/files";
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
          companyTab="files"
        >
          <CompanyFileListPage id={id} />
        </AuthenticatedLayout>
      )}
    </LoggedIn>
  );
}
