import { PageWrapper } from "@/layouts";

import { Company } from "../types";
import { GenerateShopeeAuthorizationLinkForm } from "../components/GenerateShopeeAuthorizationLinkForm";

interface GenerateShopeeAuthorizationLinkPageProps {
  companyId: Company["id"];
}

export function GenerateShopeeAuthorizationLinkPage({
  companyId,
}: GenerateShopeeAuthorizationLinkPageProps) {
  return (
    <PageWrapper>
      <GenerateShopeeAuthorizationLinkForm companyId={companyId} />
    </PageWrapper>
  );
}
