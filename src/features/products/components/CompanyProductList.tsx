import { Button } from "@/components/button";
import { Spinner } from "@/components/spinner";
import { Company } from "@/features/companies";

import { useCompanyProductListInfinite } from "../api/getCompanyProductList";
import { Status } from "./ProductListController";
import { ProductCardUI } from "./ProductCardUI";

interface CompanyProductListProps {
  id: Company["id"];
  source: "shopee";
  status: Status;
  maxPageSize: number;
}

export function CompanyProductList({
  id,
  source,
  status,
  maxPageSize,
}: CompanyProductListProps) {
  const { data, hasEnded, loadMore, isValidating } =
    useCompanyProductListInfinite({
      id,
      source,
      maxPageSize,
      status,
    });

  if (!data) return <Spinner />;

  return (
    <div>
      <div className="flex flex-col gap-16">
        {data.results.map((p) => (
          <ProductCardUI key={p.id} product={p} />
        ))}
      </div>
      <br />
      {hasEnded ? (
        <Button disabled variant="outline">
          End of list
        </Button>
      ) : (
        <Button onClick={loadMore} isLoading={isValidating}>
          Load more
        </Button>
      )}
    </div>
  );
}
