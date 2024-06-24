import { File as IFile } from "@/features/files";
import { Company } from "@/features/companies";

export interface Chat {
  company_id: Company["id"];
  is_auto_reply: boolean;
  file_id_list: IFile["id"][];
}

export interface Conversation {
  id: string;
  source: "shopee";
  is_pinned: boolean;
  num_unread: number;
  last_message_at: string;
  buyer_id: string;
  buyer_name: string;
  buyer_avatar: string | null;
}

export interface Message {
  id: string;
  conversation_id: string;
  source: "shopee";
  sender_role: "seller" | "buyer";
  sent_at: string;
  is_supported: boolean;
  text: string;
}
