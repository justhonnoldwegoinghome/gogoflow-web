import { Spinner } from "@/components/spinner";
import { formatDate } from "@/utils";
import { User } from "@/features/users";

import { UpdateCompany } from "./UpdateCompany";
import { DeleteCompany } from "./DeleteCompany";
import { Company } from "../types";
import { useCompany } from "../api/getCompany";

interface CompanySettingsProps {
  id: Company["id"];
  userId: User["id"];
}

export function CompanySettings({ id, userId }: CompanySettingsProps) {
  const companyQuery = useCompany({ id });

  if (!companyQuery.data) return <Spinner />;

  return (
    <div className="max-w-screen-tablet">
      <UpdateCompany id={id} company={companyQuery.data} />
      <br />
      <div className="flex justify-between items-center gap-8">
        <DeleteCompany id={id} userId={userId} />
        <p className="text-muted-foreground text-sm">{`Created on ${formatDate(
          new Date(companyQuery.data.created_at)
        )}`}</p>
      </div>
    </div>
  );
}
