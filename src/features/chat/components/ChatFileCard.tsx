import { Spinner } from "@/components/spinner";
import { Company } from "@/features/companies";
import { File, useFile } from "@/features/files";

import { UnassignFile } from "./UnassignFile";

interface ChatFileCardProps {
  id: File["id"];
  companyId: Company["id"];
}

export function ChatFileCard({ id, companyId }: ChatFileCardProps) {
  const fileQuery = useFile({ id });
  if (!fileQuery.data) return <Spinner />;

  return (
    <div className="flex gap-8 items-center justify-between">
      <a href={`${process.env.NEXT_PUBLIC_BASE_URL}/files/${id}/content`}>
        {fileQuery.data.name}
      </a>
      <UnassignFile id={id} companyId={companyId} />
    </div>
  );
}
