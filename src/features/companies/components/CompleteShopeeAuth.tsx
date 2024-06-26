import { useEffect } from "react";

import { Spinner } from "@/components/spinner";

import { Company } from "../types";
import { useCompleteShopeeAuth } from "../api/completeShopeeAuth";

interface CompleteShopeeAuthProps {
  companyId: Company["id"];
  code: string;
}

export function CompleteShopeeAuth({
  companyId,
  code,
}: CompleteShopeeAuthProps) {
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
