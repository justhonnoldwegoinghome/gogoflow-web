import { Settings, LogOut, User2 } from "lucide-react";
import { useRouter } from "next/router";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
} from "@/components/dropdownMenu";
import { useLogOut } from "@/features/authentication";

import { useUser } from "../api/getUser";
import { User } from "../types";

interface UserDropdownMenuProps {
  id: User["id"];
}

export function UserDropdownMenu({ id }: UserDropdownMenuProps) {
  const { push } = useRouter();

  const logOutMutation = useLogOut();

  const userQuery = useUser({ id });

  if (!userQuery.data)
    return (
      <div className="w-full h-10 rounded-full bg-secondary animate-pulse" />
    );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="w-8 h-8 flex items-center justify-center bg-white rounded-full focus-visible:ring-2 ring-ring focus-visible:outline-none border">
          <User2 size={16} className="text-muted-foreground" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem onSelect={() => push("/me")}>
            <Settings className="mr-3 h-4 w-4" />
            <span>Account</span>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => logOutMutation.trigger()}>
            <LogOut className="mr-3 h-4 w-4" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
