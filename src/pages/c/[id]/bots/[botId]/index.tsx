import { useRouter } from "next/router";
import Link from "next/link";
import { ChevronLeft, TestTubeDiagonal } from "lucide-react";

import { Button } from "@/components/button";
import { CompanyLayout } from "@/layouts";
import { LoggedIn } from "@/features/authentication";
import {
  Assistant,
  AssistantSettings,
  CompanyAssistantList,
} from "@/features/assistants";
import { Company } from "@/features/companies";

export default function Page() {
  const { query } = useRouter();
  let { id, botId } = query;

  if (!id || !botId) return <div />;

  id = id as Company["id"];
  botId = botId as Assistant["id"];

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
              <CompanyAssistantList id={id} selectedAssistantId={botId} />
            </div>
            <div className="flex-1 px-8 py-4 overflow-auto">
              <div className="mx-auto w-full max-w-screen-tablet h-full">
                <div className="w-fit ml-auto">
                  <Button asChild variant="secondary" size="sm">
                    <Link
                      href={`/c/${id}/bots/${botId}/playground`}
                      className="flex gap-2 items-center"
                    >
                      <TestTubeDiagonal size={16} />
                      <p>Playground</p>
                    </Link>
                  </Button>
                </div>
                <br />
                <AssistantSettings id={botId} companyId={id} />
              </div>
            </div>
          </div>

          <div className="laptop:hidden">
            <div className="p-6">
              <div className="flex justify-between items-center">
                <Button asChild variant="secondary">
                  <Link href={`/c/${id}/bots`}>
                    <ChevronLeft />
                    Bots
                  </Link>
                </Button>
                <Button asChild variant="secondary" size="sm">
                  <Link
                    href={`/c/${id}/bots/${botId}/playground`}
                    className="flex gap-2 items-center"
                  >
                    <TestTubeDiagonal size={16} />
                    <p>Playground</p>
                  </Link>
                </Button>
              </div>
              <br />
              <br />
              <div className="mx-auto w-full max-w-screen-tablet">
                <AssistantSettings id={botId} companyId={id} />
              </div>
            </div>
          </div>
        </CompanyLayout>
      )}
    </LoggedIn>
  );
}
