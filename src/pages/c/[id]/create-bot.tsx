import { useRouter } from "next/router";

import { CreateAssistant } from "@/features/assistants";
import { LoggedIn } from "@/features/authentication";
import { Company } from "@/features/companies";
import { UserLayout } from "@/layouts";

export default function Page() {
  const { query } = useRouter();
  let { id } = query;

  if (!id) return <div />;

  id = id as Company["id"];

  return (
    <UserLayout>
      <LoggedIn>{() => <CreateAssistant companyId={id} />}</LoggedIn>
    </UserLayout>
  );
}
