import { useState } from "react";

import { MaxPageSize } from "@/apiClient";
import { Company } from "@/features/companies";

import { CompanyProductList } from "./CompanyProductList";
import { ProductListController, Source, Status } from "./ProductListController";

interface CompanyProductListContainerProps {
  id: Company["id"];
}

export function CompanyProductListContainer({
  id,
}: CompanyProductListContainerProps) {
  const [source, setSource] = useState<Source>("shopee");
  const [status, setStatus] = useState<Status>("normal");
  const [maxPageSize, setPageSize] = useState<MaxPageSize>(10);

  return (
    <div>
      <ProductListController
        source={source}
        changeSource={(s) => setSource(s)}
        status={status}
        changeStatus={(s) => setStatus(s)}
        maxPageSize={maxPageSize}
        changePageSize={(ps) => setPageSize(ps)}
      />
      <br />
      <CompanyProductList
        id={id}
        source={source}
        status={status}
        maxPageSize={maxPageSize}
      />
    </div>
  );
}
