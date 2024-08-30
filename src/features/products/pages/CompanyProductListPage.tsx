import { useState } from "react";

import { MaxPageSize } from "@/apiClient";
import { PageWrapper } from "@/layouts";
import { Company } from "@/features/companies";

import { CompanyProductList } from "../components/CompanyProductList";
import {
  ProductListController,
  Source,
  Status,
} from "../components/ProductListController";

interface CompanyProductListPageProps {
  id: Company["id"];
}

export function CompanyProductListPage({ id }: CompanyProductListPageProps) {
  const [source, setSource] = useState<Source>("shopee");
  const [status, setStatus] = useState<Status>("normal");
  const [maxPageSize, setPageSize] = useState<MaxPageSize>(10);

  return (
    <PageWrapper>
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
    </PageWrapper>
  );
}
