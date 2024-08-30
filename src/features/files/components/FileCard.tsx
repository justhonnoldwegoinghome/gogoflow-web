import { Spinner } from "@/components/spinner";
import { Company } from "@/features/companies";

import { useFile } from "../api/getFile";
import { File } from "../types";
import { DeleteFile } from "./DeleteFile";

interface FileCardProps {
  id: File["id"];
  assistantId: Company["id"];
}

export function FileCard({ id, assistantId }: FileCardProps) {
  const fileQuery = useFile({ id });
  if (!fileQuery.data) return <Spinner />;

  return (
    <div className="flex gap-8 items-center justify-between">
      <a href={`${process.env.NEXT_PUBLIC_BASE_URL}/files/${id}/content`}>
        {fileQuery.data.name}
      </a>
      <DeleteFile id={id} assistantId={assistantId} />
    </div>
  );
}
