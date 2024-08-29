import { Assistant } from "@/features/assistants";
import { useAssistantTestAutoreplyList } from "../api/getAssistantTestAutoreplyList";
import { Spinner } from "@/components/spinner";
import { TestAutoreplyCardUI } from "./TestAutoreplyUI";

interface AssistantTestAutoreplyListProps {
  id: Assistant["id"];
}

export function AssistantTestAutoreplyList({
  id,
}: AssistantTestAutoreplyListProps) {
  const assistantTestAutoreplyListQuery = useAssistantTestAutoreplyList({ id });

  if (!assistantTestAutoreplyListQuery.data) return <Spinner />;

  return (
    <div className="flex flex-col gap-4">
      {assistantTestAutoreplyListQuery.data.results.map((t) => (
        <TestAutoreplyCardUI key={t.id} testAutoreply={t} />
      ))}
    </div>
  );
}
