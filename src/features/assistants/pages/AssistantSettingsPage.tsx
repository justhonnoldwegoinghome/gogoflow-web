import { PageWrapper } from "@/layouts";

import { Assistant } from "../types";
import { AssistantSubpageBreadcrumb } from "../components/AssistantSubpageBreadcrumb";
import { AssistantSettings } from "../components/AssistantSettings";

interface AssistantSettingsPageProps {
  id: Assistant["id"];
}

export function AssistantSettingsPage({ id }: AssistantSettingsPageProps) {
  return (
    <PageWrapper>
      <AssistantSubpageBreadcrumb id={id} subPageLabel="Settings" />
      <br />
      <br />
      <AssistantSettings id={id} />
    </PageWrapper>
  );
}
