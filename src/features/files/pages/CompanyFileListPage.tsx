import { PageWrapper } from "@/layouts";
import { Company } from "@/features/companies";

import { CompanyFileList } from "../components/CompanyFileList";

interface CompanyFileListPageProps {
  id: Company["id"];
}

export function CompanyFileListPage({ id }: CompanyFileListPageProps) {
  return (
    <PageWrapper>
      <CompanyFileList id={id} />
    </PageWrapper>
  );
}
