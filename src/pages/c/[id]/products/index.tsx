import { useRouter } from "next/router";

import { Company } from "@/features/companies";
import { LoggedIn } from "@/features/authentication";
import { CompanyProductListContainer } from "@/features/products";

export default function Page() {
  const { query } = useRouter();
  let { id } = query;

  if (!id) return <div />;

  id = id as Company["id"];

  return (
    <LoggedIn>{(userId) => <CompanyProductListContainer id={id} />}</LoggedIn>
  );
}
