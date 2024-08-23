import {
  Menu,
  MessageCircle,
  Bot,
  NotepadText,
  File,
  Box,
  Settings,
} from "lucide-react";
import { ReactElement, ReactNode } from "react";
import { useRouter } from "next/router";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/sheet";
import { Button } from "@/components/button";
import { LoggedIn } from "@/features/authentication";
import { UserDropdownMenu } from "@/features/users";
import { Company } from "@/features/companies";

type Tab =
  | "conversations"
  | "bots"
  | "bot-logs"
  | "files"
  | "products"
  | "settings";

interface CompanyLayoutProps {
  id: Company["id"];
  children: ReactNode;
  tab: Tab;
  header: {
    title: string;
    actionComponent?: ReactNode;
  };
}

export function CompanyLayout({
  id,
  children,
  tab,
  header,
}: CompanyLayoutProps) {
  return (
    <>
      <div className="laptop:hidden min-h-screen">
        <CompanySmallLayout id={id} tab={tab} header={header}>
          {children}
        </CompanySmallLayout>
      </div>
      <div className="hidden laptop:block">
        <CompanyLargeLayout id={id} tab={tab} header={header}>
          {children}
        </CompanyLargeLayout>
      </div>
    </>
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
    label: "Bot studio",
    value: "bots",
    icon: <Bot className="h-4 w-4" />,
  },
  {
    label: "Bot logs",
    value: "bot-logs",
    icon: <NotepadText className="h-4 w-4" />,
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

function CompanySmallLayout({ id, children, tab, header }: CompanyLayoutProps) {
  return (
    <div className="flex flex-col bg-secondary">
      <TopBar id={id} tab={tab} />

      <div className="px-[10px] pb-[10px]">
        <div className="bg-white h-[calc(100vh-74px)] rounded-xl flex flex-col">
          <Header header={header} />
          <div className="flex-1 overflow-auto">{children}</div>
        </div>
      </div>
    </div>
  );
}

function TopBar({ id, tab }: { id: Company["id"]; tab: Tab }) {
  const { push } = useRouter();
  return (
    <div className="h-[64px] px-[3vw] flex justify-between items-center gap-2">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <span className="text-start block text-lg font-medium tracking-wider">
              Shopeeflow
            </span>
          </SheetHeader>
          <div className="flex flex-col gap-1 py-4">
            {navItems.map((n) => (
              <SheetClose asChild key={n.label}>
                <Button
                  key={n.label}
                  variant={tab === n.value ? "secondary" : "ghost"}
                  className="flex gap-2 items-center w-full justify-start"
                  onClick={() => push(getHref(id, n.value))}
                >
                  {n.icon}
                  <span>{n.label}</span>
                </Button>
              </SheetClose>
            ))}
          </div>
        </SheetContent>
      </Sheet>
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

function CompanyLargeLayout({ id, children, tab, header }: CompanyLayoutProps) {
  return (
    <div className="flex">
      <SideBar id={id} tab={tab} />
      <div className="bg-secondary flex-1 p-[2vh]">
        <div className="bg-white h-[96vh] rounded-xl flex flex-col">
          <Header header={header} />
          <div className="flex-1 overflow-auto">{children}</div>
        </div>
      </div>
    </div>
  );
}

function SideBar({ id, tab }: { id: Company["id"]; tab: Tab }) {
  const { push } = useRouter();

  return (
    <div className="py-[3vh] px-4 h-screen overflow-auto border-r flex flex-col gap-6">
      <span className="block text-lg font-medium tracking-wider">
        Shopeeflow
      </span>
      <div className="flex flex-col gap-12 justify-between flex-1">
        <div className="flex flex-col gap-1 items-start">
          {navItems.map((n) => (
            <Button
              key={n.label}
              variant={tab === n.value ? "secondary" : "ghost"}
              className="flex gap-2 items-center w-full justify-start"
              onClick={() => push(getHref(id, n.value))}
            >
              {n.icon}
              <span>{n.label}</span>
            </Button>
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
    </div>
  );
}

function Header({ header }: Pick<CompanyLayoutProps, "header">) {
  return (
    <div className="px-6 py-3 border-b bg-white rounded-t-xl flex justify-between gap-12">
      <p className="text-xl font-semibold">{header?.title}</p>
      {header?.actionComponent && header.actionComponent}
    </div>
  );
}
