import { useRouter } from "next/router";

import {
  Company,
  CompanySummary,
  DeleteCompanyButton,
} from "@/features/companies";
import { LoggedIn } from "@/features/authentication";
import { CompanyAssistants } from "@/features/assistants";

export default function CompanyPage() {
  const query = useRouter().query;
  let { id } = query;

  if (!id) return <div />;

  id = id as Company["id"];

  return (
    <LoggedIn>
      {(userId) => (
        <div>
          <h1 className="font-bold">About the company</h1>
          <CompanySummary id={id} />
          <DeleteCompanyButton id={id} userId={userId} />
          <br />
          <br />
          <h2 className="font-bold">Company's assistants</h2>
          <CompanyAssistants id={id} />
        </div>
      )}
    </LoggedIn>
  );
}
