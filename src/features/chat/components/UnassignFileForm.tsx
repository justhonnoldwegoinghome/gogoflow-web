import { File } from "@/features/files";
import { Company } from "@/features/companies";

import { useUnassignFile } from "../api/unassignFile";

interface UnassignFileFormProps {
  id: File["id"];
  companyId: Company["id"];
}

export function UnassignFileForm({ id, companyId }: UnassignFileFormProps) {
  const unassignFileMutation = useUnassignFile({ companyId });

  return (
    <button
      onClick={() => unassignFileMutation.trigger({ data: { fileId: id } })}
      className="p-3 text-red-500"
    >
      {unassignFileMutation.isMutating ? "Spinner" : "Unassign from chat"}
    </button>
  );
}
