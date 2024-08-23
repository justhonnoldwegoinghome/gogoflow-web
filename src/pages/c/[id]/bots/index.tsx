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
          <div className="h-full flex flex-col">
            <div className="px-6 py-3 border-b sticky top-0 bg-white z-10">
              <div className="flex gap-4 justify-between items-center">
                <p className="text-xl  font-semibold">Bot studio</p>
                <Button asChild size="sm">
                  <Link href={`/c/${id}/create-bot`}>Create bot</Link>
                </Button>
              </div>
            </div>

            <div className="flex-1">
              <div className="laptop:flex divide-x-[1px] h-full hidden">
                <div className="flex-1 max-w-[550px] p-6">
                  <CompanyAssistantList id={id} selectedAssistantId={null} />
                </div>
                <div />
              </div>

              <div className="laptop:hidden">
                <CompanyAssistantList id={id} selectedAssistantId={null} />
              </div>
            </div>
          </div>
        )}
      </LoggedIn>
    </CompanyLayout>
  );
}
