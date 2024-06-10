import { Company } from "@/features/companies";

import { useCompanyChatFiles } from "../api/getCompanyChatFiles";
import { DeleteFile } from "./DeleteFile";

interface CompanyChatFilesProps {
  id: Company["id"];
}

export function CompanyChatFiles({ id }: CompanyChatFilesProps) {
  const companyChatFilesQuery = useCompanyChatFiles({ id });

  if (!companyChatFilesQuery.data) return <div></div>;

  return (
    <div>
      {companyChatFilesQuery.data.results.map((f) => (
        <div key={f.id} className="flex gap-12">
          <a href={`${process.env.NEXT_PUBLIC_BASE_URL}/files/${f.id}/content`}>
            {f.name}
          </a>
          <DeleteFile id={f.id} companyId={id} purpose="chat" />
        </div>
      ))}
    </div>
  );
}
