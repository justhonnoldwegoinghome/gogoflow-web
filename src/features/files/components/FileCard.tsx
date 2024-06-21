import { Company } from "@/features/companies";

import { useFile } from "../api/getFile";
import { File } from "../types";
import { DeleteFile } from "./DeleteFile";

interface FileCardProps {
  id: File["id"];
  companyId: Company["id"];
}

export function FileCard({ id, companyId }: FileCardProps) {
  const fileQuery = useFile({ id });

  if (!fileQuery.data) return <div>Spinner</div>;

  return (
    <div className="flex gap-8 justify-between border p-1">
      <a href={`${process.env.NEXT_PUBLIC_BASE_URL}/files/${id}/content`}>
        {fileQuery.data.name}
      </a>
      <DeleteFile id={id} companyId={companyId} />
    </div>
  );
}
