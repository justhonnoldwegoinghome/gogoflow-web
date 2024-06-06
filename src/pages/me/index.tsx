import Link from "next/link";

import { LoggedIn } from "@/features/authentication";
import { UserCompanies } from "@/features/companies";

export default function UserDashboard() {
  return (
    <LoggedIn>
      {(userId) => (
        <div>
          <Link href="/me/create-company">Create company</Link>
          <UserCompanies id={userId} />
        </div>
      )}
    </LoggedIn>
  );
}
