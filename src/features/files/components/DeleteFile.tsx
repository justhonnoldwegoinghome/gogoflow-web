import { Button } from "@/components/button";
import { Company } from "@/features/companies";

import { File } from "../types";
import { useDeleteFile } from "../api/deleteFile";

interface DeleteFileProps {
  id: File["id"];
  assistantId: Company["id"];
}

export function DeleteFile({ id, assistantId }: DeleteFileProps) {
  const deleteFileMutation = useDeleteFile({ id, assistantId });

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
