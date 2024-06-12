import { useRouter } from "next/router";

import { Company, GenerateShopeeAuthLinkForm } from "@/features/companies";
import { LoggedIn } from "@/features/authentication";

export default function Page() {
  const query = useRouter().query;
  let { id } = query;

  if (!id) return <div />;

  id = id as Company["id"];

  return (
    <LoggedIn>
      {(userId) => (
        <div>
          <GenerateShopeeAuthLinkForm companyId={id} />
        </div>
      )}
    </LoggedIn>
  );
}
