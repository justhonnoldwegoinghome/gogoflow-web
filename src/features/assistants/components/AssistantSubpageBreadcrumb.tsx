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
  subPageLabel: string;
}

export function AssistantSubpageBreadcrumb({
  id,
  subPageLabel,
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
            <BreadcrumbLink href={`/c/${company_id}/bots`}>Bots</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={`/c/${company_id}/bots/${id}`}>
              {name}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{subPageLabel}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
