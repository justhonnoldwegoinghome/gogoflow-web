import { Menu, Bot, Settings } from "lucide-react";
import { ReactElement, ReactNode } from "react";
import { useRouter } from "next/router";

import { User, UserDropdownMenu } from "@/features/users";
import { Company, UserCompanyList } from "@/features/companies";
import { Button } from "@/components/button";
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
    <div className="h-screen overflow-auto flex flex-col">
      <Header
        userId={userId}
        selectedCompanyId={selectedCompanyId}
        companyTab={companyTab}
      />

      <div className="flex flex-1 overflow-hidden">
        {isCompanyView && (
          <aside className="hidden laptop:block bg-white h-full pl-4 pr-20 pt-4 pb-24 overflow-auto border-r">
            <CompanyNavBar id={selectedCompanyId} companyTab={companyTab} />
          </aside>
        )}

        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}

function Header({
  userId,
  selectedCompanyId,
  companyTab,
}: Pick<
  AuthenticatedLayoutProps,
  "userId" | "selectedCompanyId" | "companyTab"
>) {
  const isCompanyView = selectedCompanyId && companyTab;

  return (
    <header className="flex bg-secondary px-4 py-2 justify-between">
      {isCompanyView ? (
        <div className="flex items-center gap-2">
          <div className="laptop:hidden">
            <CompanyNavSheet id={selectedCompanyId} companyTab={companyTab} />
          </div>
          <UserCompanyList id={userId} selectedCompanyId={selectedCompanyId} />
        </div>
      ) : (
        <div>
          <UserCompanyList id={userId} selectedCompanyId={selectedCompanyId} />
        </div>
      )}

      <UserDropdownMenu id={userId} />
    </header>
  );
}

type CompanyTab = "conversations" | "assistants" | "products" | "settings";

const companyNavItems: {
  label: string;
  value: CompanyTab;
  icon: ReactElement;
}[] = [
  {
    label: "Assistants",
    value: "assistants",
    icon: <Bot className="h-4 w-4" />,
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

function CompanyNavBar({
  id,
  companyTab,
}: {
  id: Company["id"];
  companyTab: CompanyTab;
}) {
  const { push } = useRouter();

  return (
    <nav className="flex flex-col gap-6 w-fit">
      <span className="block text-lg font-medium tracking-wider">Gogoflow</span>
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
    </nav>
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
        <button className="w-8 h-8 rounded-full flex justify-center items-center bg-white focus:outline-none">
          <Menu size={16} strokeWidth={1} />
        </button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <span className="text-start block text-lg font-medium tracking-wider">
            Gogoflow
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
