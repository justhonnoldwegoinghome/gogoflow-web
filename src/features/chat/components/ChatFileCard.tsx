import { Company } from "@/features/companies";
import { File, useFile } from "@/features/files";

interface ChatFileCardProps {
  id: File["id"];
  companyId: Company["id"];
}

export function ChatFileCard({ id, companyId }: ChatFileCardProps) {
  const fileQuery = useFile({ id });

  if (!fileQuery.data) return <div>Spinner</div>;

  return (
    <div className="flex gap-8 justify-between border p-1">
      <a href={`${process.env.NEXT_PUBLIC_BASE_URL}/files/${id}/content`}>
        {fileQuery.data.name}
      </a>
      <button>Unassign file button</button>
    </div>
  );
}
