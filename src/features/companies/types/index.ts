import { User } from "@/features/users";

export interface Company {
  id: string;
  created_at: string;
  admin_id: User["id"];
  member_id_list: User["id"][];
  name: string;
  shopee_shop_id: string | null;
  shopee_is_authorized: boolean;
  shopee_authorized_at: string | null;
  chat_is_auto_reply: boolean;
  chat_asst_id: string;
  chat_asst_instructions: string;
}
