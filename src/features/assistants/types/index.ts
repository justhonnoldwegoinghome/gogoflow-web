import { Company } from "@/features/companies";

export interface Assistant {
  id: string;
  company_id: Company["id"];
  name: string;
  role: "chat";
}
