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
            <div className="p-4 border-b">
              <p className="text-2xl  font-semibold">Bot tester</p>
            </div>
            <div className="p-4">
              <p>Coming soon 🧸</p>
            </div>
          </div>
        )}
      </LoggedIn>
    </CompanyLayout>
  );
}
