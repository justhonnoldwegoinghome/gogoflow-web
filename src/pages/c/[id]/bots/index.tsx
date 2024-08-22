import { useRouter } from "next/router";

import { LoggedIn } from "@/features/authentication";
import { CompanyLayout } from "@/layouts";
import { Company } from "@/features/companies";
import { CompanyAssistantList } from "@/features/assistants";

export default function Page() {
  const { query } = useRouter();
  let { id } = query;

  if (!id) return <div />;

  id = id as Company["id"];

  return (
    <CompanyLayout id={id} tab="bots">
      <LoggedIn>
        {(userId) => (
          <div>
            <div className="p-4 border-b">
              <p className="text-2xl font-semibold">Bot studio</p>
            </div>

            <div className="p-4 max-w-screen-tablet">
              <CompanyAssistantList id={id} selectedAssistantId={null} />
            </div>
          </div>
        )}
      </LoggedIn>
    </CompanyLayout>
  );
}
