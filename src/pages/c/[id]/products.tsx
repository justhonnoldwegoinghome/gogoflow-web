import { useRouter } from "next/router";

import { Company } from "@/features/companies";
import { LoggedIn } from "@/features/authentication";
import { CompanyProductListContainer } from "@/features/products";
import { CompanyLayout } from "@/layouts";

export default function Page() {
  const { query } = useRouter();
  let { id } = query;

  if (!id) return <div />;

  id = id as Company["id"];

  return (
    <LoggedIn>
      {(userId) => (
        <CompanyLayout id={id} tab="files" header={{ title: "Products" }}>
          <div className="p-6 max-w-screen-tablet">
            <CompanyProductListContainer id={id} />
          </div>
        </CompanyLayout>
      )}
    </LoggedIn>
  );
}
