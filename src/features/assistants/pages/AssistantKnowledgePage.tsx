import { PageWrapper } from "@/layouts";
import { Assistant } from "@/features/assistants";
import { AssistantFileList, UploadFiles } from "@/features/files";

import { AssistantSubpageBreadcrumb } from "../components/AssistantSubpageBreadcrumb";

interface AssistantKnowledgePageProps {
  id: Assistant["id"];
}

export function AssistantKnowledgePage({ id }: AssistantKnowledgePageProps) {
  return (
    <PageWrapper>
      <AssistantSubpageBreadcrumb id={id} subPageLabel="Knowledge center" />
      <br />
      <br />
      <AssistantFileList id={id} />
      <br />
      <br />
      <UploadFiles assistantId={id} />
    </PageWrapper>
  );
}
