import { useRouter } from "next/router";

import { AuthenticatedLayout } from "@/layouts";
import {
  Company,
  GenerateShopeeAuthorizationLinkPage,
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
          <GenerateShopeeAuthorizationLinkPage companyId={id} />
        </AuthenticatedLayout>
      )}
    </LoggedIn>
  );
}
