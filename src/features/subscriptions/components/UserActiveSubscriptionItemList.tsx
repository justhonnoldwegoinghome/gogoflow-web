import { Spinner } from "@/components/spinner";
import { User } from "@/features/users";

import { useUserActiveSubscriptionItemList } from "../api/getUserActiveSubscriptionItemList";

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
        <p>Not subscribed</p>
        <button>Upgrade to Pro</button>
      </div>
    );

  return (
    <div>
      <div>
        {userActiveSubscriptionItemListQuery.data.results.map((as, i) => (
          <div key={i}>{as.tier}</div>
        ))}
      </div>
      <button>Manage subscription</button>
    </div>
  );
}
