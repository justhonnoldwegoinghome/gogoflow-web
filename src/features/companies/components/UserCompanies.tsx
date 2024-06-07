import Link from "next/link";

import { User } from "@/features/users";

import { useUserCompanies } from "../api/getUserCompanies";

interface UserCompaniesProps {
  id: User["id"];
}

export function UserCompanies({ id }: UserCompaniesProps) {
  const userCompaniesQuery = useUserCompanies({ id });

  if (!userCompaniesQuery.data) return <div></div>;

  return (
    <div>
      {userCompaniesQuery.data.results.map(({ id, name }) => (
        <div key={id}>
          <Link href={`/c/${id}`}>{name}</Link>
        </div>
      ))}
    </div>
  );
}
