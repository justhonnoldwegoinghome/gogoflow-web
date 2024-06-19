import { Company } from "@/features/companies";

export interface ChatSettings {
  company_id: Company["id"];
  is_auto_reply: boolean;
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

export interface ShopeeConversationMessage {
  processed: {
    id: string;
    conversation_id: Conversation["id"];
    created_at: string;
    sender_role: "seller" | "buyer";
    status:
      | "normal"
      | "auto_reply"
      | "blocked"
      | "user_chat"
      | "web_chat"
      | "censored_whitelist"
      | "censored_blacklist"
      | "offwork_autoreply";
    content: any;
    source_content: any;
    quoted_msg: any;
    msg_type:
      | "add_on_deal"
      | "bundle_deal"
      | "bundle_message"
      | "faq"
      | "faq_feedback"
      | "faq_liveagent"
      | "faq_liveagent_prompt"
      | "faq_question"
      | "faq_unsupported"
      | "faq_sale"
      | "general_option_pack"
      | "selected_general_option"
      | "image"
      | "image_with_text"
      | "item"
      | "item_list"
      | "notification"
      | "offer"
      | "order"
      | "shopping_cart"
      | "sticker"
      | "text"
      | "unrated_order_reminder"
      | "video"
      | "voucher"
      | "webview"
      | "new_faq"
      | "faq_type_choice"
      | "faq_bot_request_text"
      | "faq_bot_request_order"
      | "faq_bot_response";
  };
  raw: any;
}
