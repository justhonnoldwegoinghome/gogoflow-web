import { useRouter } from "next/router";

import { Company, CompanySummary } from "@/features/companies";
import { LoggedIn } from "@/features/authentication";
import { CompanyAssistants } from "@/features/assistants";

export default function CompanyPage() {
  const query = useRouter().query;
  let { id } = query;

  if (!id) return <div />;

  id = id as Company["id"];

  return (
    <LoggedIn>
      {() => (
        <div>
          <h1>Company</h1>
          <CompanySummary id={id} />
          <br />
          <h2>Assistants</h2>
          <CompanyAssistants id={id} />
        </div>
      )}
    </LoggedIn>
  );
}
