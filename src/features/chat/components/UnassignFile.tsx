import { File } from "@/features/files";
import { Company } from "@/features/companies";

import { useUnassignFile } from "../api/unassignFile";
import { Button } from "@/components/button";

interface UnassignFileProps {
  id: File["id"];
  companyId: Company["id"];
}

export function UnassignFile({ id, companyId }: UnassignFileProps) {
  const unassignFileMutation = useUnassignFile({ companyId });

  return (
    <Button
      variant="destructive"
      onClick={() => unassignFileMutation.trigger({ data: { fileId: id } })}
      isLoading={unassignFileMutation.isMutating}
    >
      Unassign from chat
    </Button>
  );
}
