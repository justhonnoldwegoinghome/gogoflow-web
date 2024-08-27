import { formatDate } from "@/utils";
import { PageWrapper } from "@/layouts";
import { Company } from "@/features/companies";
import { Spinner } from "@/components/spinner";

import { Assistant } from "../types";
import { useAssistant } from "../api/getAssistant";
import { UpdateAssistantForm } from "../components/UpdateAssistantForm";
import { DeleteAssistant } from "../components/DeleteAssistant";

interface AssistantSettingsPageProps {
  id: Assistant["id"];
  companyId: Company["id"];
}

export function AssistantSettingsPage({
  id,
  companyId,
}: AssistantSettingsPageProps) {
  const assistantQuery = useAssistant({ id });

  if (!assistantQuery.data) return <Spinner />;

  const { name, created_at } = assistantQuery.data;

  return (
    <PageWrapper>
      <div className="px-6">
        <p className="font-semibold">{name}</p>
        <p className="text-sm text-muted-foreground">{id}</p>
      </div>
      <div>
        <UpdateAssistantForm id={id} assistant={assistantQuery.data} />
      </div>

      <div className="px-6 flex justify-between items-center gap-8">
        <DeleteAssistant id={id} companyId={companyId} />
        <p className="text-muted-foreground text-sm">{`Created ${formatDate(
          new Date(created_at)
        )}`}</p>
      </div>
    </PageWrapper>
  );
}
