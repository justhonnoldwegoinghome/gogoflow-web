import { PageWrapper } from "@/layouts";
import { Assistant } from "@/features/assistants";
import { AssistantTestAutoreplyList } from "@/features/testAutoreplies";

import { AssistantSubpageBreadcrumb } from "../components/AssistantSubpageBreadcrumb";

interface AssistantTestAutoreplyListPageProps {
  id: Assistant["id"];
}

export function AssistantTestAutoreplyListPage({
  id,
}: AssistantTestAutoreplyListPageProps) {
  return (
    <PageWrapper>
      <AssistantSubpageBreadcrumb id={id} subPageLabel="Test logs" />
      <br />
      <br />
      <AssistantTestAutoreplyList id={id} />
    </PageWrapper>
  );
}
