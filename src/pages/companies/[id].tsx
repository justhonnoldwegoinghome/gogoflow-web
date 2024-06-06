import { useRouter } from "next/router";

import { Company, CompanySummary } from "@/features/companies";

export default function CompanyPage() {
  const query = useRouter().query;
  let { id } = query;

  if (!id) return <div />;

  id = id as Company["id"];

  return (
    <div>
      <h1>Company</h1>
      <CompanySummary id={id} />
      <br />
      <h2>Assistants</h2>
    </div>
  );
}
