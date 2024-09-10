import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/breadcrumb";

import { Assistant } from "../types";
import { useAssistant } from "../api/getAssistant";

interface AssistantSubpageBreadcrumbProps {
  id: Assistant["id"];
  subpageLabel: string;
}

export function AssistantSubpageBreadcrumb({
  id,
  subpageLabel,
}: AssistantSubpageBreadcrumbProps) {
  const assistantQuery = useAssistant({ id });

  if (!assistantQuery.data)
    return <div className="w-24 h-8 rounded-lg bg-secondary animate-pulse" />;

  const { company_id, name } = assistantQuery.data;

  return (
    <div>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={`/c/${company_id}/assistants`}>
              Assistants
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/c/${company_id}/assistants/${id}`}>
              {name}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{subpageLabel}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
