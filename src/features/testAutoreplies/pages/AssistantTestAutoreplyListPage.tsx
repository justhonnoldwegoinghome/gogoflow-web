import { PageWrapper } from "@/layouts";
import { Assistant } from "@/features/assistants";

import { AssistantTestAutoreplyList } from "../components/AssistantTestAutoreplyList";

interface AssistantTestAutoreplyListPageProps {
  id: Assistant["id"];
}

export function AssistantTestAutoreplyListPage({
  id,
}: AssistantTestAutoreplyListPageProps) {
  return (
    <PageWrapper>
      <AssistantTestAutoreplyList id={id} />
    </PageWrapper>
  );
}
