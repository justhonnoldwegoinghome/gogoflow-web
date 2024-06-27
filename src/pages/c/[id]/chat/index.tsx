import Link from "next/link";
import { useRouter } from "next/router";

import { Button } from "@/components/button";
import { Company } from "@/features/companies";
import { LoggedIn } from "@/features/authentication";
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
            <div className="ml-auto w-fit">
              <Button asChild variant="link">
                <Link href={`/c/${id}/chat/conversations`}>
                  View conversations
                </Link>
              </Button>
            </div>
          </div>
          <Chat companyId={id} />
        </div>
      )}
    </LoggedIn>
  );
}
