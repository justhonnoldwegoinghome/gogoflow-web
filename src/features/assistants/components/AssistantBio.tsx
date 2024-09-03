import { formatDate } from "@/utils";

import { useAssistant } from "../api/getAssistant";
import { Assistant } from "../types";

export function AssistantBio({ id }: { id: Assistant["id"] }) {
  const assistantQuery = useAssistant({ id });

  if (!assistantQuery.data) return <AssistantBioSkeleton />;

  const { name, created_at, is_active } = assistantQuery.data;

  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="font-medium">{name}</p>
        <p className="text-muted-foreground text-sm">{id}</p>
      </div>

      <div className="flex justify-between gap-4">
        {is_active ? (
          <span className="bg-teal-100 text-teal-600 px-3 py-1 rounded-md text-sm">
            Active
          </span>
        ) : (
          <span className="bg-amber-100 text-amber-600 px-3 py-1 rounded-md text-sm">
            Inactive
          </span>
        )}

        <p className="text-muted-foreground text-sm">
          {`Created at ${formatDate(new Date(created_at))}`}
        </p>
      </div>
    </div>
  );
}

function AssistantBioSkeleton() {
  return <div className="h-24 w-full bg-secondary rounded-lg animate-pulse" />;
}
