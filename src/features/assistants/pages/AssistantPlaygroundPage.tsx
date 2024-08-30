import { PageWrapper } from "@/layouts";
import { Assistant } from "@/features/assistants";

import { AssistantSubpageBreadcrumb } from "../components/AssistantSubpageBreadcrumb";

interface AssistantPlaygroundPageProps {
  id: Assistant["id"];
}

export function AssistantPlaygroundPage({ id }: AssistantPlaygroundPageProps) {
  return (
    <PageWrapper>
      <AssistantSubpageBreadcrumb id={id} subPageLabel="Playground" />
      <br />
      <br />
      <div>Coming soon</div>
    </PageWrapper>
  );
}
