import { Company } from "@/features/companies";

import { useCompanyAssistants } from "../api/getCompanyAssistants";

interface CompanyAssistantsProps {
  id: Company["id"];
}

export function CompanyAssistants({ id }: CompanyAssistantsProps) {
  const companyAssistantsQuery = useCompanyAssistants({ id });

  if (!companyAssistantsQuery.data) return <div></div>;

  return (
    <div>
      {companyAssistantsQuery.data.results.map(({ id, name }) => (
        <div key={id}>{name}</div>
      ))}
    </div>
  );
}
