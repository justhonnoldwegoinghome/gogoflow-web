import { Button } from "@/components/button";
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
      <Button
        variant="destructive"
        onClick={() => deleteFileMutation.trigger()}
        isLoading={deleteFileMutation.isMutating}
      >
        Delete
      </Button>
    </div>
  );
}
