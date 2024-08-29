import { Menu, MessageCircle, Bot, Box, Settings } from "lucide-react";
import { ReactElement, ReactNode } from "react";

import { User, UserDropdownMenu } from "@/features/users";
import { Company, UserCompanyList } from "@/features/companies";
import { Button } from "@/components/button";
import { useRouter } from "next/router";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/sheet";

interface AuthenticatedLayoutProps {
  userId: User["id"];
  selectedCompanyId: Company["id"] | null;
  companyTab: CompanyTab | null;
  children: ReactNode;
}

export function AuthenticatedLayout({
  userId,
  selectedCompanyId,
  companyTab,
  children,
}: AuthenticatedLayoutProps) {
  const isCompanyView = selectedCompanyId && companyTab;

  return (
    <>
      <div id="smol-layout" className="laptop:hidden">
        <div className="flex flex-col h-[100vh]">
          <nav className="px-4 py-2 bg-secondary">
            {isCompanyView ? (
              <div className="flex gap-4">
                <CompanyNavSheet
                  id={selectedCompanyId}
                  companyTab={companyTab}
                />
                <div className="flex-1">
                  <UserNavTopbar
                    userId={userId}
                    selectedCompanyId={selectedCompanyId}
                  />
                </div>
              </div>
            ) : (
              <UserNavTopbar
                userId={userId}
                selectedCompanyId={selectedCompanyId}
              />
            )}
          </nav>
          <div className="flex-1 overflow-auto">{children}</div>
        </div>
      </div>

      <div id="large-layout" className="hidden laptop:block">
        <div className="flex flex-col h-[100vh]">
          <div className="px-4 py-2 bg-secondary">
            <UserNavTopbar
              userId={userId}
              selectedCompanyId={selectedCompanyId}
            />
          </div>
          {isCompanyView ? (
            <div className="flex-1 overflow-auto flex">
              <div className="pl-4 pr-16 py-8 h-full overflow-auto bg-white border-r">
                <CompanyNavSidebar
                  id={selectedCompanyId}
                  companyTab={companyTab}
                />
              </div>
              <div className="flex-1 overflow-auto">{children}</div>
            </div>
          ) : (
            <div className="flex-1 overflow-auto">{children}</div>
          )}
        </div>
      </div>
    </>
  );
}

function UserNavTopbar({
  userId,
  selectedCompanyId,
}: Pick<AuthenticatedLayoutProps, "userId" | "selectedCompanyId">) {
  return (
    <div className="flex justify-between items-center gap-8">
      <UserCompanyList id={userId} selectedCompanyId={selectedCompanyId} />
      <UserDropdownMenu id={userId} />
    </div>
  );
}

type CompanyTab = "conversations" | "bots" | "products" | "settings";

const companyNavItems: {
  label: string;
  value: CompanyTab;
  icon: ReactElement;
}[] = [
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

function getHref(id: Company["id"], companyTab: CompanyTab) {
  return `/c/${id}/${companyTab}`;
}

function CompanyNavSidebar({
  id,
  companyTab,
}: {
  id: Company["id"];
  companyTab: CompanyTab;
}) {
  const { push } = useRouter();

  return (
    <aside className="flex flex-col gap-6 w-fit">
      <span className="block text-lg font-medium tracking-wider">
        Shopeeflow
      </span>
      <div className="flex flex-col gap-12 justify-between flex-1">
        <div className="flex flex-col gap-1 items-start">
          {companyNavItems.map((n) => (
            <Button
              key={n.label}
              variant={companyTab === n.value ? "secondary" : "ghost"}
              className="flex gap-2 items-center w-full justify-start"
              onClick={() => push(getHref(id, n.value))}
            >
              {n.icon}
              <span>{n.label}</span>
            </Button>
          ))}
        </div>
      </div>
    </aside>
  );
}

function CompanyNavSheet({
  id,
  companyTab,
}: {
  id: Company["id"];
  companyTab: CompanyTab;
}) {
  const { push } = useRouter();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="w-8 h-8 rounded-full flex justify-center items-center bg-white focus:outline-none focus:ring-2 ring-ring">
          <Menu size={16} strokeWidth={1} />
        </button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <span className="text-start block text-lg font-medium tracking-wider">
            Shopeeflow
          </span>
        </SheetHeader>
        <div className="flex flex-col gap-1 py-4">
          {companyNavItems.map((n) => (
            <SheetClose asChild key={n.label}>
              <Button
                key={n.label}
                variant={companyTab === n.value ? "secondary" : "ghost"}
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
  );
}
