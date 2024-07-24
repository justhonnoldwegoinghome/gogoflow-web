import { ReactNode } from "react";

import { LoggedIn } from "@/features/authentication";
import { UserDropdownMenu } from "@/features/users";

interface AuthenticatedLayoutProps {
  children: ReactNode;
}

export function UserLayout({ children }: AuthenticatedLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <TopBar />
      <main className="px-[3vw] py-[5vh] flex-1">
        <div className="max-w-screen-laptop mx-auto">{children}</div>
      </main>
    </div>
  );
}

function TopBar() {
  return (
    <div className="px-[3vw] py-4 border-b">
      <div className="max-w-screen-laptop mx-auto flex justify-end">
        <LoggedIn
          loader={
            <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
          }
        >
          {(userId) => <UserDropdownMenu id={userId} />}
        </LoggedIn>
      </div>
    </div>
  );
}
