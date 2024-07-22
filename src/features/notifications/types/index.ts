export interface Notification {
  id: string;
  created_at: string;
  recipient_company_id: string;
  is_read: boolean;
  text: string;
  reference: {
    type: "conversation";
    id: string;
  } | null;
}
