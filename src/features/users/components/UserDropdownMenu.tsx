import { Building2, LogOut } from "lucide-react";
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

import { useUser } from "../api/getUser";
import { User } from "../types";

interface UserMenuProps {
  id: User["id"];
}

export function UserDropdownMenu({ id }: UserMenuProps) {
  const { push } = useRouter();

  const logOutMutation = useLogOut();

  const userQuery = useUser({ id });
  if (!userQuery.data)
    return <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse" />;

  const { email } = userQuery.data;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-12 h-12 rounded-full">
        <img
          className="w-12 h-12 rounded-full"
          src="https://images.unsplash.com/photo-1608889175250-c3b0c1667d3a?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onSelect={() => push("/me")}>
            <Building2 className="mr-2 h-4 w-4" />
            <span>My companies</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => logOutMutation.trigger()}>
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
