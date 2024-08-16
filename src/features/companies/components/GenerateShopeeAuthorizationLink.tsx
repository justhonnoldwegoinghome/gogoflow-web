import { useState } from "react";

import { TypographyP } from "@/components/typography";
import { Button } from "@/components/button";
import { Input } from "@/components/form";

import { useGenerateShopeeAuthorizationLink } from "../api/generateShopeeAuthorizationLink";
import { Company } from "../types";

interface GenerateShopeeAuthorizationLinkProps {
  companyId: Company["id"];
}

export function GenerateShopeeAuthorizationLink({
  companyId,
}: GenerateShopeeAuthorizationLinkProps) {
  const [shopeeShopId, setShopeeShopId] = useState("");

  const generateShopeeAuthorizationLinkMutation =
    useGenerateShopeeAuthorizationLink({
      companyId,
    });

  return (
    <div className="bg-white w-fit mx-auto p-4 rounded-xl flex flex-col gap-12">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          generateShopeeAuthorizationLinkMutation.trigger({
            companyId,
            data: { shopee_shop_id: shopeeShopId },
          });
        }}
      >
        <div className="flex flex-col gap-2">
          <Input
            type="text"
            placeholder="Shopee Shop ID"
            value={shopeeShopId}
            onChange={(e) => setShopeeShopId(e.target.value)}
          />
          <Button
            isLoading={generateShopeeAuthorizationLinkMutation.isMutating}
          >
            Submit
          </Button>
        </div>

        <br />
        <p className="text-muted-foreground">
          Please authorize using shop account.
        </p>
      </form>
    </div>
  );
}
