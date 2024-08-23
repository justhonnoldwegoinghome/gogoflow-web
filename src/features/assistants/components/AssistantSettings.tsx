import { TestTubeDiagonal } from "lucide-react";
import Link from "next/link";

import { Company } from "@/features/companies";
import { Spinner } from "@/components/spinner";
import { formatDate } from "@/utils";
import { Button } from "@/components/button";

import { Assistant } from "../types";
import { UpdateAssistant } from "./UpdateAssistant";
import { DeleteAssistant } from "./DeleteAssistant";
import { useAssistant } from "../api/getAssistant";

interface AssistantSettingsProps {
  id: Assistant["id"];
  companyId: Company["id"];
}

export function AssistantSettings({ id, companyId }: AssistantSettingsProps) {
  const assistantQuery = useAssistant({ id });

  if (!assistantQuery.data) return <Spinner />;

  return (
    <div>
      <UpdateAssistant id={id} />

      <br />

      <div className="flex justify-between items-center gap-8">
        <DeleteAssistant id={id} companyId={companyId} />
        <p className="text-muted-foreground text-sm">{`Created ${formatDate(
          new Date(assistantQuery.data.created_at)
        )}`}</p>
      </div>
    </div>
  );
}
