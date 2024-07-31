import { useRouter } from "next/router";

import { Company, GenerateShopeeAuthorizationLink } from "@/features/companies";
import { LoggedIn } from "@/features/authentication";
import { CompanyLayout } from "@/layouts";

export default function Page() {
  const query = useRouter().query;
  let { id } = query;

  if (!id) return <div />;

  id = id as Company["id"];

  return (
    <CompanyLayout id={id} tab="settings">
      <LoggedIn>
        {(userId) => (
          <div>
            <GenerateShopeeAuthorizationLink companyId={id} />
          </div>
        )}
      </LoggedIn>
    </CompanyLayout>
  );
}
