import { useRouter } from "next/router";
import { CompanyLayout } from "@/layouts";
import { LoggedIn } from "@/features/authentication";
import { Assistant, AssistantSettings } from "@/features/assistants";
import { Company } from "@/features/companies";
import { CreateTestAutoreply } from "@/features/testAutoreplies";

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
            title: "Bot playground",
          }}
        >
          <div className="laptop:flex divide-x-[1px] h-full hidden">
            <div className="flex-1 max-w-[550px] p-6">
              <AssistantSettings id={botId} companyId={id} />
            </div>
            <div className="flex-1 px-8 py-4 overflow-auto">
              <CreateTestAutoreply assistantId={botId} source="shopee" />
            </div>
          </div>
        </CompanyLayout>
      )}
    </LoggedIn>
  );
}
