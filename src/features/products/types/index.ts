export interface Product {
  id: string;
  source: "shopee";
  created_at: string;
  name: string;
  description: string;
  status:
    | "NORMAL"
    | "BANNED"
    | "UNLIST"
    | "REVIEWING"
    | "SELLER_DELETE"
    | "SHOPEE_DELETE";
}
