import { useRouter } from "next/router";

import { Company } from "@/features/companies";
import { LoggedIn } from "@/features/authentication";
import { CompanyNotificationListContainer } from "@/features/notifications";
import { CompanyLayout } from "@/layouts";

export default function Page() {
  const { query } = useRouter();
  let { id } = query;

  if (!id) return <div />;

  id = id as Company["id"];

  return (
    <CompanyLayout id={id} tab="notifications">
      <LoggedIn>
        {(userId) => <CompanyNotificationListContainer id={id} />}
      </LoggedIn>
    </CompanyLayout>
  );
}
