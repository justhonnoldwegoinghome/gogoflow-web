import { PageWrapper } from "@/layouts";
import { Company } from "@/features/companies";

import { CompanyAssistantList } from "../components/CompanyAssistantList";

interface CompanyAssistantListPageProps {
  id: Company["id"];
}

export function CompanyAssistantListPage({
  id,
}: CompanyAssistantListPageProps) {
  return (
    <PageWrapper>
      <CompanyAssistantList id={id} />
    </PageWrapper>
  );
}
