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
    <LoggedIn>
      {(userId) => (
        <CompanyLayout
          id={id}
          tab="bots"
          header={{
            title: "Bot studio",
            actionComponent: (
              <Button asChild size="sm">
                <Link href={`/c/${id}/create-bot`}>Create bot</Link>
              </Button>
            ),
          }}
        >
          <div className="laptop:flex divide-x-[1px] h-full hidden">
            <div className="flex-1 max-w-[550px] p-6">
              <CompanyAssistantList id={id} selectedAssistantId={null} />
            </div>
            <div />
          </div>

          <div className="laptop:hidden">
            <div className="p-6">
              <CompanyAssistantList id={id} selectedAssistantId={null} />
            </div>
          </div>
        </CompanyLayout>
      )}
    </LoggedIn>
  );
}
