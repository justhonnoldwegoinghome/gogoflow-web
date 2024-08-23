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
    <LoggedIn>
      {(userId) => (
        <CompanyLayout id={id} tab="settings" header={{ title: "Settings" }}>
          <div>
            <GenerateShopeeAuthorizationLink companyId={id} />
          </div>
        </CompanyLayout>
      )}
    </LoggedIn>
  );
}
