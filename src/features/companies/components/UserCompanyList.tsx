import Link from "next/link";
import { useRouter } from "next/router";

import { User } from "@/features/users";

import { useUserCompanyList } from "../api/getUserCompanyList";
import { Button } from "@/components/button";

interface UserCompanyListProps {
  id: User["id"];
}

export function UserCompanyList({ id }: UserCompanyListProps) {
  const push = useRouter().push;

  const userCompanyListQuery = useUserCompanyList({ id });
  if (!userCompanyListQuery.data) return <div></div>;

  return (
    <div>
      <div>
        {userCompanyListQuery.data.results.length === 0 ? (
          <div>
            <Button
              type="button"
              variant="link"
              onClick={() => push("/me/create-company")}
            >
              Create company
            </Button>
          </div>
        ) : (
          userCompanyListQuery.data.results.map(({ id, name }) => (
            <div key={id}>
              <Link
                href={`/c/${id}`}
                className="hover:underline underline-offset-4"
              >
                {name}
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
