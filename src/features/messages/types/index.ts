export interface Message {
  id: string;
  conversation_id: string;
  source: "shopee";
  sender_role: "seller" | "buyer";
  sent_at: string;
  is_supported: boolean;
  text: string | null;
  reference: {
    type: "product" | "order";
    id: string;
  } | null;
}
