import { useRouter } from "next/router";

import { Spinner } from "@/components/spinner";
import { AuthenticatedLayout } from "@/layouts";
import { LoggedIn } from "@/features/authentication";
import { Company, CompleteShopeeAuthPage } from "@/features/companies";

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
          <CompleteShopeeAuthPage companyId={id} code={code} />
        </AuthenticatedLayout>
      )}
    </LoggedIn>
  );
}
