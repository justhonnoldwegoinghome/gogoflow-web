import {
  User as UserIcon,
  Plus,
  Building2,
  Settings,
  LogOut,
} from "lucide-react";
import { useRouter } from "next/router";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuGroup,
} from "@/components/dropdownMenu";
import { useLogOut } from "@/features/authentication";
import { useUserCompanyList } from "@/features/companies";

import { useUser } from "../api/getUser";
import { User } from "../types";

interface UserMenuProps {
  id: User["id"];
}

export function UserDropdownMenu({ id }: UserMenuProps) {
  const { push } = useRouter();

  const logOutMutation = useLogOut();

  const userQuery = useUser({ id });
  const userCompanyListQuery = useUserCompanyList({ id });

  if (!userQuery.data || !userCompanyListQuery.data)
    return (
      <div className="w-full h-10 rounded-full bg-secondary animate-pulse" />
    );

  const { email } = userQuery.data;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-sm flex gap-2 items-center px-4 py-2 rounded-full bg-secondary">
        <span>{email}</span>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem onSelect={() => push("/create-company")}>
            <Plus className="mr-3 h-4 w-4" />
            <span>Create company</span>
          </DropdownMenuItem>
          {userCompanyListQuery.data.results.map((c) => (
            <DropdownMenuItem
              key={c.id}
              onSelect={() => push(`/c/${c.id}/conversations`)}
            >
              <Building2 className="mr-3 h-4 w-4" />
              <span>{c.name}</span>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onSelect={() => push("/me")}>
              <Settings className="mr-3 h-4 w-4" />
              <span>Account</span>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => logOutMutation.trigger()}>
            <LogOut className="mr-3 h-4 w-4" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
