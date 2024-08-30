import _ from "lodash";
import { useState } from "react";

import { MaxPageSize } from "@/apiClient";
import { PageWrapper } from "@/layouts";
import { Company } from "@/features/companies";

import { CompanyAutoreplyList } from "../components/CompanyAutoreplyList";

interface CompanyAutoreplyListPageProps {
  id: Company["id"];
}

export function CompanyAutoreplyListPage({
  id,
}: CompanyAutoreplyListPageProps) {
  const [maxPageSize, setPageSize] = useState<MaxPageSize>(10);

  return (
    <PageWrapper>
      <CompanyAutoreplyList id={id} maxPageSize={maxPageSize} />
    </PageWrapper>
  );
}
