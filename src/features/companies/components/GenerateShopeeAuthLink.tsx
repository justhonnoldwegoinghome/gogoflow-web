import { useState } from "react";

import { TypographyP } from "@/components/typography";
import { Button } from "@/components/button";
import { Input } from "@/components/form";

import { useGenerateShopeeAuthLink } from "../api/generateShopeeAuthLink";
import { Company } from "../types";

interface GenerateShopeeAuthLinkProps {
  companyId: Company["id"];
}

export function GenerateShopeeAuthLink({
  companyId,
}: GenerateShopeeAuthLinkProps) {
  const [shopeeShopId, setShopeeShopId] = useState(0);

  const generateShopeeAuthLinkMutation = useGenerateShopeeAuthLink({
    companyId,
  });

  return (
    <div className="bg-white w-fit mx-auto p-4 rounded-xl flex flex-col gap-12">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          generateShopeeAuthLinkMutation.trigger({
            companyId,
            data: { shopee_shop_id: shopeeShopId },
          });
        }}
      >
        <div className="flex flex-col gap-2">
          <label>Shopee shop ID</label>
          <Input
            type="number"
            placeholder="Shopee Shop ID"
            value={shopeeShopId}
            onChange={(e) => setShopeeShopId(Number(e.target.value))}
          />
          <Button isLoading={generateShopeeAuthLinkMutation.isMutating}>
            Submit
          </Button>
        </div>

        <TypographyP>
          Note: Can only authorize using shop account (not main account).
        </TypographyP>
      </form>
    </div>
  );
}
