import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Link from "next/link";

import { useLogOut } from "@/features/authentication";

import { useUser } from "../api/getUser";
import { User } from "../types";

interface UserMenuProps {
  id: User["id"];
}

export function UserMenu({ id }: UserMenuProps) {
  const logOutMutation = useLogOut();
  const userQuery = useUser({ id });

  if (!userQuery.data)
    return <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse" />;

  const { email } = userQuery.data;

  return (
    <Menu>
      <MenuButton>
        <img
          className="w-12 h-12 rounded-full"
          src="https://images.unsplash.com/photo-1608889175250-c3b0c1667d3a?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
      </MenuButton>
      <MenuItems
        anchor="bottom end"
        className="bg-white min-w-[240px] rounded-lg p-2 shadow transition duration-100 ease-out"
      >
        <MenuItem>
          <Link
            className="p-3 rounded-md data-[focus]:bg-gray-100 block"
            href="/me"
          >
            {email}
          </Link>
        </MenuItem>
        <MenuItem>
          <button
            onClick={() => logOutMutation.trigger()}
            className="p-3 rounded-md data-[focus]:bg-gray-200 block w-full text-left"
          >
            Log out
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
}
