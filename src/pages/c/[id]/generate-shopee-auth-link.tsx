import { useRouter } from "next/router";

import { AuthenticatedLayout, PagePadding } from "@/layouts";
import {
  Company,
  GenerateShopeeAuthorizationLinkForm,
} from "@/features/companies";
import { LoggedIn } from "@/features/authentication";

export default function Page() {
  const query = useRouter().query;
  let { id } = query;

  if (!id) return <div />;

  id = id as Company["id"];

  return (
    <LoggedIn>
      {(userId) => (
        <AuthenticatedLayout
          userId={userId}
          selectedCompanyId={id}
          companyTab="settings"
        >
          <PagePadding>
            <div className="w-full max-w-screen-tablet mx-auto">
              <GenerateShopeeAuthorizationLinkForm companyId={id} />
            </div>
          </PagePadding>
        </AuthenticatedLayout>
      )}
    </LoggedIn>
  );
}
