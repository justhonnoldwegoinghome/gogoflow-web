import { Trash2 } from "lucide-react";

import { Button } from "@/components/button";
import { formatDate } from "@/utils";
import { Spinner } from "@/components/spinner";
import { User } from "@/features/users";

import { Company } from "../types";
import { useCompany } from "../api/getCompany";
import { UpdateCompanyForm } from "./UpdateCompanyForm";
import { DeleteCompanyDialog } from "./DeleteCompanyDialog";

interface CompanySettingsProps {
  id: Company["id"];
  userId: User["id"];
}

export function CompanySettings({ id, userId }: CompanySettingsProps) {
  const companyQuery = useCompany({ id });

  if (!companyQuery.data) return <Spinner />;

  return (
    <div className="flex flex-col gap-8">
      <UpdateCompanyForm id={id} company={companyQuery.data} />

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
    </div>
  );
}
