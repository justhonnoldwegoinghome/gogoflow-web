import { Database, FlaskConical, Scroll, Settings } from "lucide-react";
import { useRouter } from "next/router";

import { AuthenticatedLayout } from "@/layouts";
import { LoggedIn } from "@/features/authentication";
import { Company } from "@/features/companies";
import {
  Assistant,
  AssistantBio,
  AssistantPageBreadcrumb,
  AssistantSubpageLink,
} from "@/features/assistants";

export default function Page() {
  const { query } = useRouter();
  let { id, botId } = query;

  if (!id || !botId) return <div />;

  id = id as Company["id"];
  botId = botId as Assistant["id"];

  return (
    <LoggedIn>
      {(userId) => (
        <AuthenticatedLayout
          userId={userId}
          selectedCompanyId={id}
          companyTab="bots"
        >
          <AssistantPageBreadcrumb id={botId} />
          <br />
          <br />
          <AssistantBio id={botId} />
          <br />
          <br />
          <div className="flex flex-col gap-4">
            <AssistantSubpageLink
              href={`/c/${id}/bots/${botId}/knowledge-center`}
              Icon={Database}
            >
              Knowledge center
            </AssistantSubpageLink>
            <AssistantSubpageLink
              href={`/c/${id}/bots/${botId}/test-logs`}
              Icon={Scroll}
            >
              Test logs
            </AssistantSubpageLink>
            <AssistantSubpageLink
              href={`/c/${id}/bots/${botId}/settings`}
              Icon={Settings}
            >
              Settings
            </AssistantSubpageLink>
            <AssistantSubpageLink
              href={`/c/${id}/bots/${botId}/playground`}
              Icon={FlaskConical}
            >
              Playground
            </AssistantSubpageLink>
          </div>
        </AuthenticatedLayout>
      )}
    </LoggedIn>
  );
}
