import { PageWrapper } from "@/layouts";
import { Company } from "@/features/companies";

import { CreateAssistantForm } from "../components/CreateAssistantForm";

interface CreateAssistantPageProps {
  companyId: Company["id"];
}

export function CreateAssistantPage({ companyId }: CreateAssistantPageProps) {
  return (
    <PageWrapper>
      <CreateAssistantForm companyId={companyId} />
    </PageWrapper>
  );
}
