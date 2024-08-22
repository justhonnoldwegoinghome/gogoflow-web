import { useRouter } from "next/router";
import { ChevronLeft } from "lucide-react";

import { LoggedIn } from "@/features/authentication";
import { CompanyLayout } from "@/layouts";
import {
  Assistant,
  CompanyAssistantList,
  UpdateAssistant,
} from "@/features/assistants";
import { Company } from "@/features/companies";
import Link from "next/link";
import { Button } from "@/components/button";

export default function Page() {
  const { query } = useRouter();
  let { id, botId } = query;

  if (!id || !botId) return <div />;

  id = id as Company["id"];
  botId = botId as Assistant["id"];

  return (
    <CompanyLayout id={id} tab="bots">
      <LoggedIn>
        {(userId) => (
          <div>
            <div className="text-2xl font-semibold pb-2 px-4">Bots</div>

            <div className="laptop:flex divide-x-[0px] hidden border-t">
              <div className="flex-[2] p-4">
                <CompanyAssistantList id={id} selectedAssistantId={botId} />
              </div>
              <div className="flex-[3] px-8 py-4">
                <UpdateAssistant id={botId} />
              </div>
            </div>
            <div className="laptop:hidden border-t">
              <div className="py-4">
                <div>
                  <Button asChild variant="secondary">
                    <Link href={`/c/${id}/bots`}>
                      <ChevronLeft />
                      Bots
                    </Link>
                  </Button>
                  <br />
                  <br />
                  <UpdateAssistant id={botId} />
                </div>
              </div>
            </div>
          </div>
        )}
      </LoggedIn>
    </CompanyLayout>
  );
}
