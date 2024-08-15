import { Company } from "@/features/companies";
import { Conversation } from "@/features/conversations";

interface LLMMessage {
  role: "assistant" | "user";
  content: string;
}

export interface BotResponse {
  id: string;
  company_id: Company["id"];
  conversation_id: Conversation["id"];
  source: "shopee";
  created_at: string;
  input_llm_message_list: LLMMessage[];
  output_llm_message_list: LLMMessage[];
  trigger: "manual" | "auto";
  is_require_action: boolean;
}
