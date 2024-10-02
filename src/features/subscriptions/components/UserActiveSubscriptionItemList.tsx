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
      <div className="grid grid-cols-1 tablet:grid-cols-2 gap-6">
        <div className="bg-white border rounded-xl p-6">
          <div className="flex justify-between items-center">
            <p className="text-2xl font-semibold text-secondary-foreground">
              Free
            </p>
            <span className="font-medium text-xs px-2 py-1 rounded bg-secondary">
              Current
            </span>
          </div>
          <p className="font-medium">S$0/month</p>
          <br />
          <ul className="ml-4 list-disc">
            <li>Access to playground</li>
          </ul>
        </div>
        <div className="bg-primary text-primary-foreground rounded-xl p-6">
          <p className="text-2xl font-semibold text-primary-foreground">Pro</p>
          <p className="font-medium">S$40/month</p>
          <br />
          <ul className="ml-4 text-primary-foreground list-disc">
            <li>Access to playground</li>
            <li>Activate assistant to respond to customers automatically</li>
          </ul>
          <br />
          <CheckoutSessionLink
            plan="pro"
            successUrl={`${process.env.NEXT_PUBLIC_CLIENT_ORIGIN}/me`}
            returnUrl={`${process.env.NEXT_PUBLIC_CLIENT_ORIGIN}/me`}
          >
            💎 Upgrade to Pro
          </CheckoutSessionLink>
        </div>
      </div>
    );

  return (
    <div>
      <div>
        <p className="text-muted-foreground">
          You have an ongoing subscription.
        </p>
      </div>
      <br />
      <div>
        <CustomerPortalSessionLink
          returnUrl={`${process.env.NEXT_PUBLIC_CLIENT_ORIGIN}/me`}
        >
          Manage your subscription
        </CustomerPortalSessionLink>
      </div>
    </div>
  );
}
