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
