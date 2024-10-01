import { Spinner } from "@/components/spinner";
import { User } from "@/features/users";

import { useUserActiveSubscriptionItemList } from "../api/getUserActiveSubscriptionItemList";
import { CustomerPortalSessionLink } from "./CustomerPortalSessionLink";
import { CheckoutSessionLink } from "./CheckoutSessionLink";

interface UserActiveSubscriptionItemListProps {
  id: User["id"];
}

export function UserActiveSubscriptionItemList({
  id,
}: UserActiveSubscriptionItemListProps) {
  const userActiveSubscriptionItemListQuery = useUserActiveSubscriptionItemList(
    { id }
  );

  if (!userActiveSubscriptionItemListQuery.data) return <Spinner />;

  if (userActiveSubscriptionItemListQuery.data.results.length === 0)
    return (
      <div>
        <CheckoutSessionLink
          plan="pro"
          successUrl={`${process.env.NEXT_PUBLIC_CLIENT_ORIGIN}/me`}
          returnUrl={`${process.env.NEXT_PUBLIC_CLIENT_ORIGIN}/me`}
        >
          Upgrade to Pro
        </CheckoutSessionLink>
      </div>
    );

  return (
    <div>
      <div>
        {userActiveSubscriptionItemListQuery.data.results.map((as, i) => (
          <div key={i}>{as.tier}</div>
        ))}
      </div>
      <CustomerPortalSessionLink
        returnUrl={`${process.env.NEXT_PUBLIC_CLIENT_ORIGIN}/me`}
      >
        Manage subscription
      </CustomerPortalSessionLink>
    </div>
  );
}
