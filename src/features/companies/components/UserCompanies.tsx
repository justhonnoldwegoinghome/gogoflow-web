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
      {userCompaniesQuery.data.results.map(({ name }) => (
        <div>{name}</div>
      ))}
    </div>
  );
}
