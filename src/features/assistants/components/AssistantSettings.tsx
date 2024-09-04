import { Trash2 } from "lucide-react";

import { Spinner } from "@/components/spinner";
import { Button } from "@/components/button";
import { Switch } from "@/components/switch";

import { Assistant } from "../types";
import { useAssistant } from "../api/getAssistant";
import { UpdateAssistantForm } from "./UpdateAssistantForm";
import { DeleteAssistantDialog } from "./DeleteAssistantDialog";
import { ActivateAssistantDialog } from "./ActivateAssistantDialog";
import { DeactivateAssistantDialog } from "./DeactivateAssistantDialog";

interface AssistantSettingsProps {
  id: Assistant["id"];
}

export function AssistantSettings({ id }: AssistantSettingsProps) {
  const assistantQuery = useAssistant({ id });

  if (!assistantQuery.data) return <Spinner />;

  const { is_active } = assistantQuery.data;

  return (
    <div className="flex flex-col gap-8">
      <div className="ml-auto">
        {is_active ? (
          <DeactivateAssistantDialog id={id}>
            {(openDialog) => (
              <div className="flex items-center gap-2">
                <Switch checked={true} onCheckedChange={openDialog} />
                <label className="text-sm font-medium block">Active</label>
              </div>
            )}
          </DeactivateAssistantDialog>
        ) : (
          <ActivateAssistantDialog id={id}>
            {(openDialog) => (
              <div className="flex items-center gap-2">
                <Switch checked={false} onCheckedChange={openDialog} />
                <label className="text-sm font-medium block">Inactive</label>
              </div>
            )}
          </ActivateAssistantDialog>
        )}
      </div>

      <UpdateAssistantForm id={id} assistant={assistantQuery.data} />

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
