import { ReactNode } from "react";
import Link from "next/link";

import { Button } from "@/components/button";

interface UnauthenticatedLayoutProps {
  children: ReactNode;
}

export function UnauthenticatedLayout({
  children,
}: UnauthenticatedLayoutProps) {
  return (
    <div className="bg-white">
      <NavBar />
      <div className="max-w-screen-tablet mx-auto py-12 px-[3vw]">
        {children}
      </div>
    </div>
  );
}

function NavBar() {
  return (
    <div className="max-w-screen-tablet mx-auto flex justify-between items-center py-10 px-[3vw]">
      <div className="tracking-widest">Shopeeflow</div>
      <div className="flex gap-2">
        <Button asChild>
          <Link href="/auth/request-sign-up">Sign up</Link>
        </Button>
        <Button asChild variant="ghost">
          <Link href="/auth/log-in">Log in</Link>
        </Button>
      </div>
    </div>
  );
}
