import { Plus, ChevronsUpDown } from "lucide-react";
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
import { User } from "@/features/users";

import { Company } from "../types";
import { useUserCompanyList } from "../api/getUserCompanyList";

interface UserCompanyListProps {
  id: User["id"];
  selectedCompanyId: Company["id"] | null;
}

export function UserCompanyList({
  id,
  selectedCompanyId,
}: UserCompanyListProps) {
  const { push } = useRouter();

  const userCompanyListQuery = useUserCompanyList({ id });

  if (!userCompanyListQuery.data)
    return <div className="w-32 h-9 rounded-md bg-secondary animate-pulse" />;

  if (userCompanyListQuery.data.results.length === 0)
    return (
      <div>
        <Button asChild size="sm">
          <Link href="/create-company">
            <Plus className="mr-2" size={16} />
            <p>Create company</p>
          </Link>
        </Button>
      </div>
    );

  const selectedCompany = selectedCompanyId
    ? userCompanyListQuery.data.results.filter(
        (c) => c.id === selectedCompanyId
      )[0]
    : null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="text-sm bg-white px-3 py-1 rounded-md focus:ring-2 ring-ring focus:outline-none">
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">
              {selectedCompany ? selectedCompany.name : "Select company"}
            </span>
            <ChevronsUpDown size={12} strokeWidth={1} />
          </div>
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuGroup>
          {userCompanyListQuery.data.results.map((c) => (
            <DropdownMenuItem key={c.id} onSelect={() => push(`/c/${c.id}`)}>
              <span>{c.name}</span>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onSelect={() => push("/create-company")}>
              <span className="font-medium">Create company</span>
              <Plus size={16} className="ml-3" />
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
