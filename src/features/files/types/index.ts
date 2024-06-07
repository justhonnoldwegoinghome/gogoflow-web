import { Company } from "@/features/companies";
import { User } from "@/features/users";

export interface File {
  id: string;
  uploaded_at: string;
  uploader_id: User["id"];
  company_id: Company["id"];
  purpose: "chat";
  name: string;
}

export interface CompanyChatSettings {
  company_id: Company["id"];
  is_shopee_authorized: boolean;
}
