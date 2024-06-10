import { Company } from "@/features/companies";

import { File } from "../types";
import { useDeleteFile } from "../api/deleteFile";

interface DeleteFileProps {
  id: File["id"];
  companyId: Company["id"];
  purpose: File["purpose"];
}

export function DeleteFile({ id, companyId, purpose }: DeleteFileProps) {
  const deleteFileMutation = useDeleteFile({ id, companyId, purpose });

  return (
    <div>
      <button onClick={() => deleteFileMutation.trigger()}>Delete</button>
    </div>
  );
}
