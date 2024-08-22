import Link from "next/link";
import { useRouter } from "next/router";

import { LoggedIn } from "@/features/authentication";
import { CompanyLayout } from "@/layouts";
import { Company } from "@/features/companies";
import { CompanyAssistantList } from "@/features/assistants";
import { Button } from "@/components/button";

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
              <div className="flex gap-4 justify-between">
                <p className="text-2xl font-semibold">Bot studio</p>
                <Button asChild>
                  <Link href={`/c/${id}/create-bot`}>Create bot</Link>
                </Button>
              </div>
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
