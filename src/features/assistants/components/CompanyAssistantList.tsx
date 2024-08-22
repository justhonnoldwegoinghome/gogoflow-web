import clsx from "clsx";
import Link from "next/link";

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

  return (
    <div className="flex flex-col gap-4">
      {companyAssistantListQuery.data.results.map((a) => (
        <Link
          key={a.id}
          href={`/c/${id}/bots/${a.id}`}
          className={clsx(
            "p-3 rounded-lg flex gap-4 justify-between items-center hover:bg-secondary",
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
