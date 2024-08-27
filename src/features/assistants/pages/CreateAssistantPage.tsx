import { PageWrapper } from "@/layouts";
import { Company } from "@/features/companies";

import { CreateAssistantForm } from "../components/CreateAssistantForm";

interface CreateAssistantPageProps {
  companyId: Company["id"];
}

export function CreateAssistantPage({ companyId }: CreateAssistantPageProps) {
  return (
    <PageWrapper>
      <div className="flex justify-center">
        <CreateAssistantForm companyId={companyId} />
      </div>
    </PageWrapper>
  );
}
