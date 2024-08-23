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
    <LoggedIn>
      {(userId) => (
        <CompanyLayout
          id={id}
          tab="bot-tester"
          header={{ title: "Bot tester" }}
        >
          <div className="p-6">
            <p>Coming soon 🧸</p>
          </div>
        </CompanyLayout>
      )}
    </LoggedIn>
  );
}
