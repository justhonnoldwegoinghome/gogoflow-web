import { Plus, ChevronsUpDown, Bot } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuGroup,
} from "@/components/dropdownMenu";
import { Button } from "@/components/button";
import { Company } from "@/features/companies";

import { Assistant } from "../types";
import { useCompanyAssistantList } from "../api/getCompanyAssistantList";

interface CompanyAssistantListProps {
  id: Company["id"];
  selectedAssistantId: Assistant["id"] | null;
}

export function CompanyAssistantList({
  id,
  selectedAssistantId,
}: CompanyAssistantListProps) {
  const { push } = useRouter();

  const companyAssistantListQuery = useCompanyAssistantList({ id });

  if (!companyAssistantListQuery.data)
    return <div className="w-32 h-9 rounded-md bg-secondary animate-pulse" />;

  if (companyAssistantListQuery.data.results.length === 0)
    return (
      <div className="h-full flex items-center justify-center">
        <div className="flex flex-col justify-center items-center gap-4">
          <div className="flex flex-col justify-center items-center gap-4">
            <div className="bg-secondary w-20 h-20 flex items-center justify-center rounded-full">
              <Bot size={30} strokeWidth={1} />
            </div>
            <div>
              <p className="font-medium text-center">No bots found</p>
              <p className="text-sm text-muted-foreground text-center">
                Create your first bot below
              </p>
            </div>
          </div>
          <Button asChild size="sm">
            <Link href={`/c/${id}/create-bot`}>
              <Plus className="mr-2" size={16} />
              <p>Create bot</p>
            </Link>
          </Button>
        </div>
      </div>
    );

  const selectedAssistant = selectedAssistantId
    ? companyAssistantListQuery.data.results.filter(
        (c) => c.id === selectedAssistantId
      )[0]
    : null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="text-sm bg-white px-3 py-1 rounded-md focus:ring-2 ring-ring focus:outline-none border">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">
              {selectedAssistant ? selectedAssistant.name : "Select bot"}
            </span>
            <ChevronsUpDown size={12} strokeWidth={1} />
          </div>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuGroup>
          {companyAssistantListQuery.data.results.map((c) => (
            <DropdownMenuItem
              key={c.id}
              onSelect={() => push(`/c/${id}/bots/${c.id}`)}
            >
              <span>{c.name}</span>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onSelect={() => push(`/c/${id}/create-bot`)}>
              <span className="font-medium">Create bot</span>
              <Plus size={16} className="ml-3" />
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
