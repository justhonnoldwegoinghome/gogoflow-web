import { useRouter } from "next/router";

import { LoggedIn } from "@/features/authentication";
import { CompanyLayout } from "@/layouts";
import { Company, CompanySettings } from "@/features/companies";

export default function Page() {
  const { query } = useRouter();
  let { id } = query;

  if (!id) return <div />;

  id = id as Company["id"];

  return (
    <LoggedIn>
      {(userId) => (
        <CompanyLayout
          id={id}
          tab="settings"
          header={{
            title: "Settings",
          }}
        >
          <div className="p-6">
            <CompanySettings id={id} userId={userId} />
          </div>
        </CompanyLayout>
      )}
    </LoggedIn>
  );
}
