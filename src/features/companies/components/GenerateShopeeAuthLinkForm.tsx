import { useState } from "react";

import { useGenerateShopeeAuthLink } from "../api/generateShopeeAuthLink";
import { Company } from "../types";

interface GenerateShopeeAuthLinkFormProps {
  companyId: Company["id"];
}

export function GenerateShopeeAuthLinkForm({
  companyId,
}: GenerateShopeeAuthLinkFormProps) {
  const generateShopeeAuthorizationLinkMutation = useGenerateShopeeAuthLink({
    companyId,
  });

  const [shopeeShopId, setShopeeShopId] = useState("");

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
      <input
        type="text"
        placeholder="Shopee Shop ID"
        className="block border border-black"
        value={shopeeShopId}
        onChange={(e) => setShopeeShopId(e.target.value)}
      />
      <button type="submit">Submit</button>

      <br />
      <br />
      <p>Note: Can only authorize using shop account (not main account). </p>
    </form>
  );
}
