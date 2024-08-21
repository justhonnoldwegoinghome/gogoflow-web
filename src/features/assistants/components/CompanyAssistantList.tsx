import { Spinner } from "@/components/spinner";
import { Company } from "@/features/companies";

import { useCompanyAssistantList } from "../api/getCompanyAssistantList";
import { UpdateAssistant } from "./UpdateAssistant";

interface CompanyAssistantListProps {
  id: Company["id"];
}

export function CompanyAssistantList({ id }: CompanyAssistantListProps) {
  const companyAssistantListQuery = useCompanyAssistantList({ id });

  if (!companyAssistantListQuery.data) return <Spinner />;

  return (
    <div>
      {companyAssistantListQuery.data.results.map((a) => (
        <UpdateAssistant id={a.id} />
      ))}
    </div>
  );
}
