import { Trash2 } from "lucide-react";

import { Spinner } from "@/components/spinner";
import { Button } from "@/components/button";

import { Assistant } from "../types";
import { useAssistant } from "../api/getAssistant";
import { UpdateAssistantForm } from "./UpdateAssistantForm";
import { DeleteAssistantDialog } from "./DeleteAssistantDialog";

interface AssistantSettingsProps {
  id: Assistant["id"];
}

export function AssistantSettings({ id }: AssistantSettingsProps) {
  const assistantQuery = useAssistant({ id });

  if (!assistantQuery.data) return <Spinner />;

  return (
    <div>
      <UpdateAssistantForm id={id} assistant={assistantQuery.data} />
      <br />
      <br />
      <DeleteAssistantDialog id={id} companyId={assistantQuery.data.company_id}>
        {(openDialog) => (
          <Button variant="secondary" size="sm" onClick={openDialog}>
            <div className="flex gap-2 items-center">
              <Trash2 size={16} />
              <span>Delete</span>
            </div>
          </Button>
        )}
      </DeleteAssistantDialog>
    </div>
  );
}
