import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/button";

import { Assistant } from "../types";

interface AssistantCardUIProps {
  assistant: Assistant;
}

export function AssistantCardUI({ assistant }: AssistantCardUIProps) {
  return (
    <div className="border p-6 rounded-lg flex justify-between">
      <div>
        <p className="font-medium">{assistant.name}</p>
        <p className="text-sm text-muted-foreground">{assistant.id}</p>
        <br />
        {assistant.is_active ? (
          <span className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-sm">
            Active
          </span>
        ) : (
          <span className="bg-secondary text-secondary-foreground px-2 py-1 rounded-full text-sm">
            Inactive
          </span>
        )}
      </div>
      <div className="flex flex-col gap-4">
        <Button asChild variant="secondary" size="sm">
          <Link
            href={`/c/${assistant.company_id}/bots/${assistant.id}/settings`}
          >
            <p>Settings</p>
            <ArrowUpRight size={16} />
          </Link>
        </Button>
        <Button asChild variant="secondary" size="sm">
          <Link
            href={`/c/${assistant.company_id}/bots/${assistant.id}/playground`}
          >
            <p>Playground</p>
            <ArrowUpRight size={16} />
          </Link>
        </Button>
      </div>
    </div>
  );
}
