import { useRouter } from "next/router";
import { ChevronLeft } from "lucide-react";

import { LoggedIn } from "@/features/authentication";
import { CompanyLayout } from "@/layouts";
import {
  Assistant,
  CompanyAssistantList,
  DeleteAssistant,
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
            <div className="p-4 border-b">
              <div className="flex gap-4 justify-between">
                <p className="text-2xl font-semibold">Bot studio</p>
                <Button asChild>
                  <Link href={`/c/${id}/create-bot`}>Create bot</Link>
                </Button>
              </div>
            </div>

            <div className="laptop:block hidden">
              <div className="flex">
                <div className="flex-[2] p-4">
                  <CompanyAssistantList id={id} selectedAssistantId={botId} />
                </div>
                <div className="flex-[3] px-8 py-4">
                  <UpdateAssistant id={botId} />
                  <div className="mt-12">
                    <DeleteAssistant id={botId} companyId={id} />
                  </div>
                </div>
              </div>
            </div>

            <div className="laptop:hidden">
              <div className="p-4">
                <Button asChild variant="secondary">
                  <Link href={`/c/${id}/bots`}>
                    <ChevronLeft />
                    Bots
                  </Link>
                </Button>
                <br />
                <br />
                <div>
                  <UpdateAssistant id={botId} />
                  <br />
                  <div>Danger zone</div>
                  <DeleteAssistant id={botId} companyId={id} />
                </div>
              </div>
            </div>
          </div>
        )}
      </LoggedIn>
    </CompanyLayout>
  );
}
