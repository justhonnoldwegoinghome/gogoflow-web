export interface Product {
  id: string;
  source: "shopee";
  created_at: string;
  name: string;
  description: string;
  status: "normal" | "unlisted";
  variants: {
    id: string;
    name: string;
  }[];
}
