import { useRouter } from "next/router";

import { AuthenticatedLayout } from "@/layouts";
import { Company } from "@/features/companies";
import { LoggedIn } from "@/features/authentication";
import { CompanyProductListPage } from "@/features/products";

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
          companyTab="products"
        >
          <CompanyProductListPage id={id} />
        </AuthenticatedLayout>
      )}
    </LoggedIn>
  );
}
