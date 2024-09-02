import { useRouter } from "next/router";

import { Spinner } from "@/components/spinner";
import { AuthenticatedLayout } from "@/layouts";
import { LoggedIn } from "@/features/authentication";
import { Company, CompleteShopeeAuth } from "@/features/companies";

export default function Page() {
  const query = useRouter().query;
  let { id, code } = query;

  if (!id || !code) return <Spinner />;

  id = id as Company["id"];
  code = code as string;

  return (
    <LoggedIn>
      {(userId) => (
        <AuthenticatedLayout
          userId={userId}
          selectedCompanyId={id}
          companyTab="settings"
        >
          <CompleteShopeeAuth companyId={id} code={code} />
        </AuthenticatedLayout>
      )}
    </LoggedIn>
  );
}
