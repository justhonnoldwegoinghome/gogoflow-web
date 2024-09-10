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

interface AssistantPageBreadcrumbProps {
  id: Assistant["id"];
}

export function AssistantPageBreadcrumb({ id }: AssistantPageBreadcrumbProps) {
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
            <BreadcrumbPage>{name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
