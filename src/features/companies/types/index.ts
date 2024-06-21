import { User } from "@/features/users";

export interface Company {
  id: string;
  created_at: string;
  admin_id: User["id"];
  member_id_list: User["id"][];
  name: string;
  shopee: {
    shop_id: number | null;
    is_authorized: boolean;
    authorized_at: string | null;
  };
}
