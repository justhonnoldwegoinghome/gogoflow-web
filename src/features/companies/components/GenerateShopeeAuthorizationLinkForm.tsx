import { useState } from "react";

import { Button } from "@/components/button";
import { FormContainer, Input } from "@/components/form";

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
    <FormContainer
      title="Connect to Shopee shop account"
      form={
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
          </div>
        </form>
      }
      submitButton={
        <Button isLoading={generateShopeeAuthorizationLinkMutation.isMutating}>
          Submit
        </Button>
      }
    />
  );
}
