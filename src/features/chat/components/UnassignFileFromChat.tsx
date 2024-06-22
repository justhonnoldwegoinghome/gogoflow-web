import { File } from "@/features/files";
import { Company } from "@/features/companies";

import { useUnassignFileFromChat } from "../api/unassignFileFromChat";

interface UnassignFileFromChatProps {
  id: File["id"];
  companyId: Company["id"];
}

export function UnassignFileFromChat({
  id,
  companyId,
}: UnassignFileFromChatProps) {
  const unassignFileFromChatMutation = useUnassignFileFromChat({ companyId });

  return (
    <button
      onClick={() =>
        unassignFileFromChatMutation.trigger({ data: { fileId: id } })
      }
      className="p-3 text-red-500"
    >
      {unassignFileFromChatMutation.isMutating
        ? "Spinner"
        : "Unassign from chat"}
    </button>
  );
}
