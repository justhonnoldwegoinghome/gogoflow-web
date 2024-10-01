import { Button } from "@/components/button";

import { useGenerateCheckoutSessionUrl } from "../api/generateCheckoutSessionUrl";

interface CheckoutSessionLinkProps {
  plan: "pro";
  successUrl: string;
  returnUrl: string;
  children: string;
}

export function CheckoutSessionLink({
  plan,
  successUrl,
  returnUrl,
  children,
}: CheckoutSessionLinkProps) {
  const generateCheckoutSessionMutation = useGenerateCheckoutSessionUrl();

  return (
    <Button
      onClick={() =>
        generateCheckoutSessionMutation
          .trigger({
            data: { plan, success_url: successUrl, return_url: returnUrl },
          })
          .then((res) => window.open(res?.data, "_blank"))
      }
      isLoading={generateCheckoutSessionMutation.isMutating}
    >
      {children}
    </Button>
  );
}
