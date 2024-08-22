import { User } from "@/features/users";

import { UpdateCompany } from "./UpdateCompany";
import { DeleteCompany } from "./DeleteCompany";
import { Company } from "../types";

interface CompanySettingsProps {
  id: Company["id"];
  userId: User["id"];
}

export function CompanySettings({ id, userId }: CompanySettingsProps) {
  return (
    <div>
      <UpdateCompany id={id} />
      <br />
      <DeleteCompany id={id} userId={userId} />
    </div>
  );
}
