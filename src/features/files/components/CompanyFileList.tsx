import { Company } from "@/features/companies";

import { useCompanyFileList } from "../api/getCompanyFileList";
import { UploadFiles } from "./UploadFiles";
import { FileCard } from "./FileCard";

interface CompanyFileListProps {
  id: Company["id"];
}

export function CompanyFileList({ id }: CompanyFileListProps) {
  const companyFileListQuery = useCompanyFileList({ id });

  if (!companyFileListQuery.data) return <div></div>;

  return (
    <div className="flex flex-col gap-4 w-fit">
      <div>
        {companyFileListQuery.data.results.map((f) => (
          <FileCard key={f.id} id={f.id} companyId={id} />
        ))}
      </div>
      <div>
        <UploadFiles companyId={id} />
      </div>
    </div>
  );
}
