import { useRouter } from "next/router";

import { Company } from "@/features/companies";
import { LoggedIn } from "@/features/authentication";
import { Chat } from "@/features/chat";
import { Button } from "@/components/button";

export default function Page() {
  const { query, push } = useRouter();
  let { id } = query;

  if (!id) return <div />;

  id = id as Company["id"];

  return (
    <LoggedIn>
      {(userId) => (
        <div>
          <div className="ml-auto w-fit">
            <Button
              variant="link"
              onClick={() => push(`/c/${id}/chat/conversations`)}
            >
              View conversations
            </Button>
          </div>
          <Chat companyId={id} />
        </div>
      )}
    </LoggedIn>
  );
}
