import { useRouter } from "next/router";

import { Company } from "@/features/companies";
import { LoggedIn } from "@/features/authentication";
import { CompanyLayout } from "@/layouts";

export default function Page() {
  const { query } = useRouter();
  let { id } = query;

  if (!id) return <div />;

  id = id as Company["id"];

  return (
    <CompanyLayout id={id} tab="bot-tester">
      <LoggedIn>
        {(userId) => (
          <div>
            <div className="px-6 py-3 border-b sticky top-0 bg-white z-10">
              <p className="text-xl  font-semibold">Bot tester</p>
            </div>
            <div className="p-6">
              <p>Coming soon 🧸</p>
            </div>
          </div>
        )}
      </LoggedIn>
    </CompanyLayout>
  );
}
