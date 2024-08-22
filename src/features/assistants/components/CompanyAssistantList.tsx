import clsx from "clsx";
import Link from "next/link";
import { Bot, Plus } from "lucide-react";

import { Button } from "@/components/button";
import { formatDate } from "@/utils";
import { Spinner } from "@/components/spinner";
import { Company } from "@/features/companies";

import { useCompanyAssistantList } from "../api/getCompanyAssistantList";
import { Assistant } from "../types";

interface CompanyAssistantListProps {
  id: Company["id"];
  selectedAssistantId: Assistant["id"] | null;
}

export function CompanyAssistantList({
  id,
  selectedAssistantId,
}: CompanyAssistantListProps) {
  const companyAssistantListQuery = useCompanyAssistantList({ id });

  if (!companyAssistantListQuery.data) return <Spinner />;

  if (companyAssistantListQuery.data.results.length === 0)
    return (
      <div className="flex flex-col gap-4 items-center h-full justify-center">
        <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center">
          <Bot size={24} />
        </div>
        <div>
          <p className="text-center font-semibold">No bots found</p>
          <p className="text-center text-muted-foreground">
            Create a bot to get started.
          </p>
        </div>
        <div>
          <Button asChild>
            <Link
              href={`/c/${id}/create-bot`}
              className="flex gap-2 items-center"
            >
              <Plus size={16} />
              <p>Create</p>
            </Link>
          </Button>
        </div>
      </div>
    );

  return (
    <div className="flex flex-col divide-y-[1px]">
      {companyAssistantListQuery.data.results.map((a) => (
        <Link
          key={a.id}
          href={`/c/${id}/bots/${a.id}`}
          className={clsx(
            "p-3 rounded-lg flex gap-4 justify-between items-center hover:bg-secondary max-w-screen-tablet",
            {
              "bg-secondary": a.id === selectedAssistantId,
            }
          )}
        >
          <div>
            <p className="text-sm font-semibold">{a.name}</p>
            <p className="text-xs text-muted-foreground">{a.id}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">
              {formatDate(new Date(a.created_at))}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
