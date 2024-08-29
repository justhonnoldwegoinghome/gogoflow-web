import { Trash2 } from "lucide-react";

import { Button } from "@/components/button";
import { formatDate } from "@/utils";
import { PageWrapper } from "@/layouts";
import { Company } from "@/features/companies";
import { Spinner } from "@/components/spinner";

import { Assistant } from "../types";
import { useAssistant } from "../api/getAssistant";
import { UpdateAssistantForm } from "../components/UpdateAssistantForm";
import { DeleteAssistantDialog } from "../components/DeleteAssistantDialog";

interface AssistantSettingsPageProps {
  id: Assistant["id"];
}

export function AssistantSettingsPage({ id }: AssistantSettingsPageProps) {
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
        <DeleteAssistantDialog
          id={id}
          companyId={assistantQuery.data.company_id}
        >
          {(openDialog) => (
            <Button variant="secondary" size="sm" onClick={openDialog}>
              <div className="flex gap-2 items-center">
                <Trash2 size={16} />
                <span>Delete</span>
              </div>
            </Button>
          )}
        </DeleteAssistantDialog>
        <p className="text-muted-foreground text-sm">{`Created ${formatDate(
          new Date(created_at)
        )}`}</p>
      </div>
    </PageWrapper>
  );
}
