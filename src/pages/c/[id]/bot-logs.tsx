import { useRouter } from "next/router";

import { Company } from "@/features/companies";
import { LoggedIn } from "@/features/authentication";
import { CompanyLayout } from "@/layouts";
import { CompanyAssistantResponseListContainer } from "@/features/assistants";

export default function Page() {
  const { query } = useRouter();
  let { id } = query;

  if (!id) return <div />;

  id = id as Company["id"];

  return (
    <CompanyLayout id={id} tab="bot-logs">
      <LoggedIn>
        {(userId) => <CompanyAssistantResponseListContainer id={id} />}
      </LoggedIn>
    </CompanyLayout>
  );
}
