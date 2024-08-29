import { PageWrapper } from "@/layouts";
import { Assistant } from "@/features/assistants";

import { AssistantFileList } from "../components/AssistantFileList";
import { UploadFiles } from "../components/UploadFiles";

interface AssistantFileListPageProps {
  id: Assistant["id"];
}

export function AssistantFileListPage({ id }: AssistantFileListPageProps) {
  return (
    <PageWrapper>
      <AssistantFileList id={id} />
      <UploadFiles assistantId={id} />
    </PageWrapper>
  );
}
