import { useEffect } from "react";

import { Spinner } from "@/components/spinner";

import { Company } from "../types";
import { useCompleteShopeeAuth } from "../api/completeShopeeAuth";

interface CompleteShopeeAuthPageProps {
  companyId: Company["id"];
  code: string;
}

export function CompleteShopeeAuthPage({
  companyId,
  code,
}: CompleteShopeeAuthPageProps) {
  const completeShopeeAuthMutation = useCompleteShopeeAuth({
    companyId,
  });

  useEffect(() => {
    completeShopeeAuthMutation.trigger({
      companyId,
      data: { code },
    });
  }, []);

  return <Spinner />;
}
