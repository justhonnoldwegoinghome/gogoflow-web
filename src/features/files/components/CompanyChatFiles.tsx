import { Company } from "@/features/companies";

import { useCompanyChatFiles } from "../api/getCompanyChatFiles";

interface CompanyChatFilesProps {
  id: Company["id"];
}

export function CompanyChatFiles({ id }: CompanyChatFilesProps) {
  const companyChatFilesQuery = useCompanyChatFiles({ id });

  if (!companyChatFilesQuery.data) return <div></div>;

  return (
    <div>
      {companyChatFilesQuery.data.results.map(({ id }) => (
        <div key={id}>{id}</div>
      ))}
    </div>
  );
}
