import { Company } from "@/features/companies";

import { Assistant } from "../types";
import { UpdateAssistant } from "./UpdateAssistant";
import { DeleteAssistant } from "./DeleteAssistant";

interface AssistantSettingsProps {
  id: Assistant["id"];
  companyId: Company["id"];
}

export function AssistantSettings({ id, companyId }: AssistantSettingsProps) {
  return (
    <div>
      <UpdateAssistant id={id} />
      <br />
      <DeleteAssistant id={id} companyId={companyId} />
    </div>
  );
}
