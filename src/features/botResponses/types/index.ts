import { Company } from "@/features/companies";
import { Conversation } from "@/features/conversations";
import { Message } from "@/features/messages";

export interface BotResponse {
  id: string;
  company_id: Company["id"];
  conversation_id: Conversation["id"];
  source: "shopee";
  created_at: string;
  input_message_list: Message[];
  output_text_list: string[];
  trigger: "manual" | "auto";
  is_require_action: boolean;
}
