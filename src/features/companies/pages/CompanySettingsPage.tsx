import { formatDate } from "@/utils";
import { PageWrapper } from "@/layouts";
import { Spinner } from "@/components/spinner";
import { User } from "@/features/users";

import { Company } from "../types";
import { useCompany } from "../api/getCompany";
import { UpdateCompanyForm } from "../components/UpdateCompanyForm";
import { DeleteCompany } from "../components/DeleteCompany";

interface CompanySettingsPageProps {
  id: Company["id"];
  userId: User["id"];
}

export function CompanySettingsPage({ id, userId }: CompanySettingsPageProps) {
  const companyQuery = useCompany({ id });

  if (!companyQuery.data) return <Spinner />;

  return (
    <PageWrapper>
      <UpdateCompanyForm id={id} company={companyQuery.data} />

      <br />

      <div className="px-6 flex justify-between items-center gap-8">
        <DeleteCompany id={id} userId={userId} />
        <p className="text-muted-foreground text-sm">{`Created on ${formatDate(
          new Date(companyQuery.data.created_at)
        )}`}</p>
      </div>
    </PageWrapper>
  );
}
