import { Company } from "@/features/companies";
import { User } from "@/features/users";

export interface File {
  id: string;
  uploaded_at: string;
  uploader_id: User["id"];
  company_id: Company["id"];
  name: string;
}

export interface CompanyChat {
  company_id: Company["id"];
  is_shopee_authorized: boolean;
}
