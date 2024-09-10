import { Database, FlaskConical, Scroll, Settings } from "lucide-react";
import { useRouter } from "next/router";

import { AuthenticatedLayout, PagePadding } from "@/layouts";
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
  let { id, assistantId } = query;

  if (!id || !assistantId) return <div />;

  id = id as Company["id"];
  assistantId = assistantId as Assistant["id"];

  return (
    <LoggedIn>
      {(userId) => (
        <AuthenticatedLayout
          userId={userId}
          selectedCompanyId={id}
          companyTab="assistants"
        >
          <PagePadding>
            <div className="w-full max-w-screen-tablet mx-auto">
              <AssistantPageBreadcrumb id={assistantId} />
              <br />
              <br />
              <AssistantBio id={assistantId} />
              <br />
              <br />
              <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4">
                <AssistantSubpageLink
                  href={`/c/${id}/assistants/${assistantId}/knowledge-center`}
                  Icon={Database}
                >
                  Knowledge center
                </AssistantSubpageLink>
                <AssistantSubpageLink
                  href={`/c/${id}/assistants/${assistantId}/logs`}
                  Icon={Scroll}
                >
                  Logs
                </AssistantSubpageLink>
                <AssistantSubpageLink
                  href={`/c/${id}/assistants/${assistantId}/test-logs`}
                  Icon={Scroll}
                >
                  Test logs
                </AssistantSubpageLink>
                <AssistantSubpageLink
                  href={`/c/${id}/assistants/${assistantId}/settings`}
                  Icon={Settings}
                >
                  Settings
                </AssistantSubpageLink>
                <AssistantSubpageLink
                  href={`/c/${id}/assistants/${assistantId}/playground`}
                  Icon={FlaskConical}
                >
                  Playground
                </AssistantSubpageLink>
              </div>
            </div>
          </PagePadding>
        </AuthenticatedLayout>
      )}
    </LoggedIn>
  );
}
