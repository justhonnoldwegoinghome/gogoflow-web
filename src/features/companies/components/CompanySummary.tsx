import { useCompany } from "../api/getCompany";
import { Company } from "../types";

interface CompanyProps {
  id: Company["id"];
}

export function CompanySummary({ id }: CompanyProps) {
  const companyQuery = useCompany({ id });

  if (!companyQuery.data) return <div></div>;

  return (
    <div>
      <div>{companyQuery.data.name}</div>
      <div>{companyQuery.data.created_at}</div>
    </div>
  );
}
