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
            <div className="text-2xl font-semibold pb-2 px-4">Bots</div>

            <div className="border-t py-4">
              <div className="text-2xl font-semibold pb-2 px-4 border-b">
                Bots
              </div>
              <CompanyAssistantList id={id} selectedAssistantId={null} />
            </div>
          </div>
        )}
      </LoggedIn>
    </CompanyLayout>
  );
}
