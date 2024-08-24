import { Assistant } from "@/features/assistants/types";

interface LLMMessage {
  role: "assistant" | "user";
  content: string;
}

export interface TestMessage {
  text: string;
  sender_role: "buyer" | "seller";
  reference: {
    type: "order" | "product";
    id: string;
  } | null;
}

export interface TestAutoreply {
  id: string;
  assistant_id: Assistant["id"];
  source: "shopee";
  created_at: string;
  input_test_message_list: TestMessage[];
  output_llm_message_list: LLMMessage[];
  is_require_action: boolean;
}
