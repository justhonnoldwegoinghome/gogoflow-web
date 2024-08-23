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
            <div className="px-6 py-3 border-b sticky top-0 bg-white z-10">
              <p className="text-xl  font-semibold">Settings</p>
            </div>
            <div className="p-6">
              <CompanySettings id={id} userId={userId} />
            </div>
          </div>
        )}
      </LoggedIn>
    </CompanyLayout>
  );
}
