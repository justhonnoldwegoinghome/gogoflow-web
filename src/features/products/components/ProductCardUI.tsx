import { Product } from "../types";

interface ProductCardUIProps {
  product: Product;
}

export function ProductCardUI({ product }: ProductCardUIProps) {
  return (
    <div className="p-4 border rounded-lg bg-white">
      <p className="font-bold">{product.name}</p>
      <p className="text-muted-foreground text-sm whitespace-pre-wrap">
        {product.description}
      </p>
      <br />
      {product.variants.map((v) => (
        <div key={v.id}>{v.name}</div>
      ))}
    </div>
  );
}
