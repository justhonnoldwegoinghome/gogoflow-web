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
      {(userId) => <CompanyDashboard id={id} userId={userId} />}
    </LoggedIn>
  );
}
