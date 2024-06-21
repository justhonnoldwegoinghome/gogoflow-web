import { Company } from "@/features/companies";

import { File } from "../types";
import { useDeleteFile } from "../api/deleteFile";

interface DeleteFileProps {
  id: File["id"];
  companyId: Company["id"];
}

export function DeleteFile({ id, companyId }: DeleteFileProps) {
  const deleteFileMutation = useDeleteFile({ id, companyId });

  return (
    <div>
      <button onClick={() => deleteFileMutation.trigger()}>Delete</button>
    </div>
  );
}
