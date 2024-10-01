import { Button } from "@/components/button";

import { useGenerateCustomerPortalSessionUrl } from "../api/generateCustomerPortalSessionUrl";

interface CustomerPortalSessionLinkProps {
  returnUrl: string;
  children: string;
}

export function CustomerPortalSessionLink({
  returnUrl,
  children,
}: CustomerPortalSessionLinkProps) {
  const generateCustomerPortalSessionMutation =
    useGenerateCustomerPortalSessionUrl();

  return (
    <Button
      onClick={() =>
        generateCustomerPortalSessionMutation
          .trigger({ data: { return_url: returnUrl } })
          .then((res) => window.open(res?.data, "_blank"))
      }
      isLoading={generateCustomerPortalSessionMutation.isMutating}
    >
      {children}
    </Button>
  );
}
