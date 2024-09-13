import _ from "lodash";
import { Bot } from "lucide-react";

import { Assistant } from "@/features/assistants";
import { Spinner } from "@/components/spinner";

import { useAssistantAutoreplyList } from "../api/getAssistantAutoreplyList";
import { AutoreplyCardUI } from "./AutoreplyUI";

interface AssistantAutoreplyListProps {
  id: Assistant["id"];
}

export function AssistantAutoreplyList({ id }: AssistantAutoreplyListProps) {
  const assistantAutoreplyListQuery = useAssistantAutoreplyList({ id });

  if (!assistantAutoreplyListQuery.data) return <Spinner />;

  if (assistantAutoreplyListQuery.data.results.length === 0)
    return (
      <div className="w-full h-full flex flex-col justify-center items-center gap-4">
        <div className="flex flex-col justify-center items-center gap-4">
          <div className="bg-secondary w-20 h-20 flex items-center justify-center rounded-full">
            <Bot size={30} strokeWidth={1} />
          </div>
          <div>
            <p className="font-medium text-center">No logs found</p>
          </div>
        </div>
      </div>
    );

  return (
    <div className="flex flex-col gap-4 divide-y-[1px]">
      {_.orderBy(
        assistantAutoreplyListQuery.data.results,
        "created_at",
        "desc"
      ).map((a) => (
        <AutoreplyCardUI key={a.id} autoreply={a} />
      ))}
    </div>
  );
}
