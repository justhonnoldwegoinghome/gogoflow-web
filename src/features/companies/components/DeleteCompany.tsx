import { TypographyP } from "@/components/typography";
import { Button } from "@/components/button";
import { User } from "@/features/users";

import { useDeleteCompany } from "../api/deleteCompany";
import { Company } from "../types";

interface DeleteCompanyProps {
  id: Company["id"];
  userId: User["id"];
}

export function DeleteCompany({ id, userId }: DeleteCompanyProps) {
  const deleteCompanyMutation = useDeleteCompany({ id, userId });

  return (
    <div className="flex flex-col gap-4">
      <TypographyP>
        Once you delete your account, there is no going back. Please be certain.
      </TypographyP>
      <Button
        variant="destructive"
        onClick={() => deleteCompanyMutation.trigger()}
        isLoading={deleteCompanyMutation.isMutating}
        className="w-fit"
      >
        Delete company
      </Button>
    </div>
  );
}
