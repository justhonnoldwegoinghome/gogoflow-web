import { TypographyP } from "@/components/typography";
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
    <div>
      <div className="flex flex-col gap-4">
        {companyFileListQuery.data.results.length === 0 ? (
          <TypographyP>No files added yet</TypographyP>
        ) : (
          companyFileListQuery.data.results.map((f) => (
            <FileCard key={f.id} id={f.id} companyId={id} />
          ))
        )}
      </div>
      <br />
      <div className="w-fit">
        <UploadFiles companyId={id} />
      </div>
    </div>
  );
}
