import { Company } from "@/features/companies";

export interface Assistant {
  id: string;
  company_id: Company["id"];
  created_at: string;
  is_active: boolean;
  instructions: string;
}
