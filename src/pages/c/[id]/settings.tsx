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
    <CompanyLayout id={id} tab="settings">
      <LoggedIn>
        {(userId) => (
          <div>
            <div className="p-4 border-b">
              <p className="text-2xl  font-semibold">Settings</p>
            </div>
            <div className="p-4">
              <CompanySettings id={id} userId={userId} />
            </div>
          </div>
        )}
      </LoggedIn>
    </CompanyLayout>
  );
}
