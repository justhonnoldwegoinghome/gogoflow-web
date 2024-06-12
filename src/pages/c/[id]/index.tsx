import Link from "next/link";
import { useRouter } from "next/router";

import { Company, CompanyDashboard } from "@/features/companies";
import { LoggedIn } from "@/features/authentication";

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
          <CompanyDashboard id={id} userId={userId} />
          <br />
          <br />
          <h2 className="font-bold">Features</h2>
          <Link href={`/c/${id}/chat`}>Chat</Link>
        </div>
      )}
    </LoggedIn>
  );
}
