import { Bot } from "lucide-react";

import { Assistant } from "@/features/assistants";
import { Spinner } from "@/components/spinner";

import { useAssistantTestAutoreplyList } from "../api/getAssistantTestAutoreplyList";
import { TestAutoreplyCardUI } from "./TestAutoreplyUI";

interface AssistantTestAutoreplyListProps {
  id: Assistant["id"];
}

export function AssistantTestAutoreplyList({
  id,
}: AssistantTestAutoreplyListProps) {
  const assistantTestAutoreplyListQuery = useAssistantTestAutoreplyList({ id });

  if (!assistantTestAutoreplyListQuery.data) return <Spinner />;

  if (assistantTestAutoreplyListQuery.data.results.length === 0)
    return (
      <div className="w-full h-full flex flex-col justify-center items-center gap-4">
        <div className="flex flex-col justify-center items-center gap-4">
          <div className="bg-secondary w-20 h-20 flex items-center justify-center rounded-full">
            <Bot size={30} strokeWidth={1} />
          </div>
          <div>
            <p className="font-medium text-center">No bot test logs found</p>
          </div>
        </div>
      </div>
    );

  return (
    <div className="flex flex-col gap-4">
      {assistantTestAutoreplyListQuery.data.results.map((t) => (
        <TestAutoreplyCardUI key={t.id} testAutoreply={t} />
      ))}
    </div>
  );
}
