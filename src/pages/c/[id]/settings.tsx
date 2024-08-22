import { useRouter } from "next/router";

import { LoggedIn } from "@/features/authentication";
import { CompanyLayout } from "@/layouts";
import { Company, DeleteCompany, UpdateCompany } from "@/features/companies";

export default function Page() {
  const { query } = useRouter();
  let { id } = query;

  if (!id) return <div />;

  id = id as Company["id"];

  return (
    <CompanyLayout id={id} tab="settings">
      <LoggedIn>
        {(userId) => (
          <div>
            <UpdateCompany id={id} />
            <br />
            <DeleteCompany id={id} userId={userId} />
          </div>
        )}
      </LoggedIn>
    </CompanyLayout>
  );
}
