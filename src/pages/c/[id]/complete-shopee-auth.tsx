import { useRouter } from "next/router";

import { LoggedIn } from "@/features/authentication";
import { Spinner } from "@/components/spinner";

import { Company, CompleteShopeeAuth } from "@/features/companies";

export default function Page() {
  const query = useRouter().query;
  let { id, code } = query;

  if (!id || !code) return <Spinner />;

  id = id as Company["id"];
  code = code as string;

  return (
    <LoggedIn>
      {(userId) => <CompleteShopeeAuth companyId={id} code={code} />}
    </LoggedIn>
  );
}
