import { useRouter } from "next/router";

import {
  Company,
  CompanyDashboard,
  DeleteCompanyButton,
} from "@/features/companies";
import { LoggedIn } from "@/features/authentication";
import Link from "next/link";

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
          <CompanyDashboard id={id} />
          <DeleteCompanyButton id={id} userId={userId} />
          <br />
          <br />
          <h2 className="font-bold">Features</h2>
          <Link href={`/c/${id}/chat`}>Chat</Link>
        </div>
      )}
    </LoggedIn>
  );
}
