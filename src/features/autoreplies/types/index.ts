import { Company } from "@/features/companies";
import { Conversation } from "@/features/conversations";
import { Message } from "@/features/messages";

export interface OutputLLMMessage {
  role: "assistant" | "user";
  content: string;
}

export interface Autoreply {
  id: string;
  task_id: string;
  company_id: Company["id"];
  conversation_id: Conversation["id"];
  created_at: string;
  is_require_action: boolean;
  input_message_list: Message[];
  output_llm_message_list: OutputLLMMessage[];
}
