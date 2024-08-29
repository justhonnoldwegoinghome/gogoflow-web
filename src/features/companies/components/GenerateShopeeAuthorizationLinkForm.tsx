import { useState } from "react";

import { Button } from "@/components/button";
import { Input } from "@/components/form";

import { useGenerateShopeeAuthorizationLink } from "../api/generateShopeeAuthorizationLink";
import { Company } from "../types";

interface GenerateShopeeAuthorizationLinkFormProps {
  companyId: Company["id"];
}

export function GenerateShopeeAuthorizationLinkForm({
  companyId,
}: GenerateShopeeAuthorizationLinkFormProps) {
  const [shopeeShopId, setShopeeShopId] = useState("");

  const generateShopeeAuthorizationLinkMutation =
    useGenerateShopeeAuthorizationLink({
      companyId,
    });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        generateShopeeAuthorizationLinkMutation.trigger({
          companyId,
          data: { shopee_shop_id: shopeeShopId },
        });
      }}
    >
      <div className="p-6 rounded-lg bg-white w-full max-w-screen-tablet min-w-[350px] flex flex-col gap-8">
        <h2 className="text-2xl font-semibold text-center">
          Connect to Shopee
        </h2>
        <div className="flex flex-col gap-2">
          <div>
            <label className="text-sm font-medium mb-1 block">
              Shopee Shop ID
            </label>
            <Input
              type="text"
              placeholder="Shopee Shop ID"
              value={shopeeShopId}
              onChange={(e) => setShopeeShopId(e.target.value)}
            />
          </div>
        </div>
        <div>
          <Button
            isLoading={generateShopeeAuthorizationLinkMutation.isMutating}
          >
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
}
