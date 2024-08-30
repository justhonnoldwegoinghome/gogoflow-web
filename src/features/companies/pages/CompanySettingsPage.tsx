import { Trash2 } from "lucide-react";

import { Button } from "@/components/button";
import { formatDate } from "@/utils";
import { PageWrapper } from "@/layouts";
import { Spinner } from "@/components/spinner";
import { User } from "@/features/users";

import { Company } from "../types";
import { useCompany } from "../api/getCompany";
import { UpdateCompanyForm } from "../components/UpdateCompanyForm";
import { DeleteCompanyDialog } from "../components/DeleteCompanyDialog";

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
        <DeleteCompanyDialog id={id} userId={userId}>
          {(openDialog) => (
            <Button variant="secondary" size="sm" onClick={openDialog}>
              <div className="flex gap-2 items-center">
                <Trash2 size={16} />
                <span>Delete</span>
              </div>
            </Button>
          )}
        </DeleteCompanyDialog>

        <p className="text-muted-foreground text-sm">{`Created on ${formatDate(
          new Date(companyQuery.data.created_at)
        )}`}</p>
      </div>
    </PageWrapper>
  );
}
