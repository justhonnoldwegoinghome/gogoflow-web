import _ from "lodash";
import { Bot, Plus } from "lucide-react";
import Link from "next/link";

import { Spinner } from "@/components/spinner";
import { Button } from "@/components/button";
import { Company } from "@/features/companies";

import { AutoreplyUI } from "./AutoreplyUI";
import { useCompanyAutoreplyListInfinite } from "../api/getCompanyAutoreplyList";

interface CompanyAutoreplyListProps {
  id: Company["id"];
  maxPageSize: number;
}

export function CompanyAutoreplyList({
  id,
  maxPageSize,
}: CompanyAutoreplyListProps) {
  const { data } = useCompanyAutoreplyListInfinite({
    id,
    maxPageSize,
  });

  if (!data) return <Spinner />;

  if (data.results.length === 0)
    return (
      <div className="w-full h-full flex flex-col justify-center items-center gap-4">
        <div className="flex flex-col justify-center items-center gap-4">
          <div className="bg-secondary w-20 h-20 flex items-center justify-center rounded-full">
            <Bot size={30} strokeWidth={1} />
          </div>
          <div>
            <p className="font-medium text-center">No assistant logs found</p>
            <p className="text-sm text-muted-foreground text-center">
              Create your first assistant below
            </p>
          </div>
        </div>
        <Button asChild size="sm">
          <Link href={`/c/${id}/assistants/create`}>
            <Plus className="mr-2" size={16} />
            <p>Create assistant</p>
          </Link>
        </Button>
      </div>
    );

  return (
    <div className="flex flex-col gap-6">
      {_.orderBy(data.results, "created_at", "desc").map((br) => (
        <AutoreplyUI key={br.id} botResponse={br} />
      ))}
    </div>
  );
}
