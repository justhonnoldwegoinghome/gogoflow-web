import Link from "next/link";

import { Button } from "@/components/button";

export default function Page() {
  return (
    <div className="bg-[url('/water.png')] bg-no-repeat h-[350vh]">
      <NavBar />
      <main className="py-12 px-[3vw]"></main>
    </div>
  );
}

function NavBar() {
  return (
    <div className="flex justify-between items-center py-12 px-[3vw]">
      <Link href="/" className="block text-lg font-medium tracking-wider">
        Shopeeflow
      </Link>
      <div className="flex gap-2">
        <Button asChild variant="ghost">
          <Link href="/auth/request-sign-up">Sign up</Link>
        </Button>
        <Button asChild variant="ghost">
          <Link href="/auth/log-in">Log in</Link>
        </Button>
      </div>
    </div>
  );
}
