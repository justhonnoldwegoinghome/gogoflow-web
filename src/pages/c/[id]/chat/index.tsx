import Link from "next/link";
import { useRouter } from "next/router";
import { ArrowUpRight } from "lucide-react";

import { TypographyH1 } from "@/components/typography";
import { Button } from "@/components/button";
import { LoggedIn } from "@/features/authentication";
import { Company } from "@/features/companies";
import { Chat } from "@/features/chat";

export default function Page() {
  const { query } = useRouter();
  let { id } = query;

  if (!id) return <div />;

  id = id as Company["id"];

  return (
    <LoggedIn>
      {(userId) => (
        <div>
          <div className="ml-auto w-fit">
            <Button asChild variant="link">
              <Link href={`/c/${id}/chat/conversations`}>
                <ArrowUpRight className="mr-2 h-4 w-4" />
                View conversations
              </Link>
            </Button>
          </div>
          <div className="flex flex-col gap-1">
            <TypographyH1>Chat</TypographyH1>
            <Chat companyId={id} />
          </div>
        </div>
      )}
    </LoggedIn>
  );
}
