import clsx from "clsx";
import { Menu, MessageCircle, Bell, File, Box, Settings } from "lucide-react";
import { ReactElement, ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { LoggedIn } from "@/features/authentication";
import { UserDropdownMenu } from "@/features/users";
import { Company } from "@/features/companies";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/dropdownMenu";

type Tab =
  | "conversations"
  | "notifications"
  | "files"
  | "products"
  | "settings";

interface CompanyLayoutProps {
  id: Company["id"];
  children: ReactNode;
  tab: Tab;
}

export function CompanyLayout({ id, children, tab }: CompanyLayoutProps) {
  return (
    <>
      <div className="flex flex-col laptop:hidden min-h-screen">
        <TopBar id={id} tab={tab} />
        <div className="flex-1 py-[5vh] px-[3vw] max-h-screen overflow-auto">
          {children}
        </div>
      </div>
      <div className="hidden laptop:block">
        <div className="flex-1 flex">
          <SideBar id={id} tab={tab} />
          <div className="flex-1 py-[5vh] px-[3vw] max-h-screen overflow-auto">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
function TopBar({ id, tab }: { id: Company["id"]; tab: Tab }) {
  const { push } = useRouter();
  return (
    <div className="py-6 px-[3vw] flex justify-end gap-4">
      <LoggedIn
        loader={
          <div className="w-full h-10 rounded-full bg-secondary animate-pulse" />
        }
      >
        {(userId) => <UserDropdownMenu id={userId} />}
      </LoggedIn>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Menu />
        </DropdownMenuTrigger>

        <DropdownMenuContent>
          <DropdownMenuGroup>
            {navItems.map((n) => (
              <DropdownMenuItem
                key={n.label}
                onSelect={() => push(getHref(id, n.value))}
                className={clsx("flex gap-2 items-center", {
                  "font-bold": tab === n.value,
                })}
              >
                {n.icon}
                <span>{n.label}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function SideBar({ id, tab }: { id: Company["id"]; tab: Tab }) {
  return (
    <div className="flex flex-col justify-between py-[5vh] px-8 h-screen border-r">
      <div className="flex flex-col gap-2">
        {navItems.map((n) => (
          <Link
            key={n.label}
            href={getHref(id, n.value)}
            className={clsx("text-sm px-4 py-2 flex gap-2 items-center", {
              "bg-secondary text-secondary-foreground rounded-full":
                n.value === tab,
            })}
          >
            {n.icon}
            <span>{n.label}</span>
          </Link>
        ))}
      </div>
      <LoggedIn
        loader={
          <div className="w-full h-10 rounded-full bg-secondary animate-pulse" />
        }
      >
        {(userId) => <UserDropdownMenu id={userId} />}
      </LoggedIn>
    </div>
  );
}

function getHref(id: Company["id"], tab: Tab) {
  return `/c/${id}/${tab}`;
}

const navItems: { label: string; value: Tab; icon: ReactElement }[] = [
  {
    label: "Conversations",
    value: "conversations",
    icon: <MessageCircle className="h-4 w-4" />,
  },
  {
    label: "Notifications",
    value: "notifications",
    icon: <Bell className="h-4 w-4" />,
  },
  {
    label: "Files",
    value: "files",
    icon: <File className="h-4 w-4" />,
  },
  {
    label: "Products",
    value: "products",
    icon: <Box className="h-4 w-4" />,
  },
  {
    label: "Settings",
    value: "settings",
    icon: <Settings className="h-4 w-4" />,
  },
];
