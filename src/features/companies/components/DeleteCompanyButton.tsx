import { User } from "@/features/users";

import { useDeleteCompany } from "../api/deleteCompany";
import { Company } from "../types";

interface DeleteCompanyButtonProps {
  id: Company["id"];
  userId: User["id"];
}

export function DeleteCompanyButton({ id, userId }: DeleteCompanyButtonProps) {
  const deleteCompanyMutation = useDeleteCompany({ id, userId });

  return (
    <button
      type="button"
      onClick={() => {
        deleteCompanyMutation.trigger();
      }}
    >
      Delete company
    </button>
  );
}
