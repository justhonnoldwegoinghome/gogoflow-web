import Link from "next/link";

import { Button } from "@/components/button";
import { User } from "@/features/users";

import { useUserCompanyList } from "../api/getUserCompanyList";

interface UserCompanyListProps {
  id: User["id"];
}

export function UserCompanyList({ id }: UserCompanyListProps) {
  const userCompanyListQuery = useUserCompanyList({ id });
  if (!userCompanyListQuery.data) return <div></div>;

  return (
    <div>
      <div>
        <Button key={id} asChild>
          <Link href={"/me/create-company"}>Create company</Link>
        </Button>
      </div>
      <br />
      {userCompanyListQuery.data.results.map(({ id, name }) => (
        <Button key={id} asChild variant="link">
          <Link href={`/c/${id}`}>{name}</Link>
        </Button>
      ))}
    </div>
  );
}
