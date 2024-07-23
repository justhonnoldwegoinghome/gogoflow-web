import { Company } from "@/features/companies";
import { Message } from "@/features/messages";

export interface ChatCompletion {
  id: string;
  created_at: string;
  company_id: Company["id"];
  input_message_list: Message[];
  model: string;
  output_text_list: string[];
}
