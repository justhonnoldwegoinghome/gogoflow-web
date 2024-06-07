import { User } from "@/features/users";

export interface Company {
  id: string;
  created_at: string;
  admin_id: User["id"];
  member_ids: User["id"][];
  name: string;
}

export interface CompanyChatSettings {
  company_id: Company["id"];
  is_shopee_authorized: boolean;
}
