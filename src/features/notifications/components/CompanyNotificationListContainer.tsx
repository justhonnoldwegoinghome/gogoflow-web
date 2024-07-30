import { useState } from "react";
import Link from "next/link";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/select";
import { formatDate, formatTime } from "@/utils";
import { Button } from "@/components/button";
import { Spinner } from "@/components/spinner";
import { MaxPageSize } from "@/apiClient";
import { Company } from "@/features/companies";

import { useCompanyNotificationListInfinite } from "../api/getCompanyNotificationList";
import { useMarkAsRead } from "../api/markAsRead";
import { useMarkAsUnread } from "../api/markAsUnread";
import { useNotification } from "../api/getNotification";
import { Notification } from "../types";

interface CompanyNotificationListContainerProps {
  id: Company["id"];
}

export function CompanyNotificationListContainer({
  id,
}: CompanyNotificationListContainerProps) {
  const [maxPageSize, setPageSize] = useState<MaxPageSize>(10);

  return (
    <div className="max-w-screen-tablet mx-auto">
      {/* <NotificationListController
        maxPageSize={maxPageSize}
        changePageSize={(ps) => setPageSize(ps)}
      />
      <br /> */}
      <CompanyNotificationList id={id} maxPageSize={maxPageSize} />
    </div>
  );
}

interface NotificationListControllerProps {
  maxPageSize: MaxPageSize;
  changePageSize: (ps: MaxPageSize) => void;
}

const pageSizeMapping = [
  {
    value: 10,
    label: "10",
  },
  {
    value: 20,
    label: "20",
  },
  {
    value: 50,
    label: "50",
  },
];

function NotificationListController({
  maxPageSize,
  changePageSize,
}: NotificationListControllerProps) {
  return (
    <div className="py-4 flex gap-4">
      <Select
        value={String(maxPageSize)}
        onValueChange={(ps) => changePageSize(Number(ps))}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {pageSizeMapping.map((c) => (
              <SelectItem key={c.label} value={String(c.value)}>
                {c.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

interface CompanyNotificationListProps {
  id: Company["id"];
  maxPageSize: number;
}

function CompanyNotificationList({
  id,
  maxPageSize,
}: CompanyNotificationListProps) {
  const { data } = useCompanyNotificationListInfinite({
    id,
    maxPageSize,
  });

  if (!data) return <Spinner />;

  return (
    <div className="flex flex-col gap-6">
      {data.results.map((n) => (
        <NotificationCard key={n.id} id={n.id} />
      ))}
    </div>
  );
}

interface NotificationCardProps {
  id: Notification["id"];
}

export function NotificationCard({ id }: NotificationCardProps) {
  const notificationQuery = useNotification({ id });
  const markAsReadMutation = useMarkAsRead({
    id,
  });
  const markAsUnreadMutation = useMarkAsUnread({
    id,
  });

  if (!notificationQuery.data) return <Spinner />;

  const { recipient_company_id, created_at, is_read, text, reference } =
    notificationQuery.data;

  return (
    <div className="p-4 rounded-lg border flex justify-between gap-8">
      <div>
        <p className="font-medium">{text}</p>
        <br />
        {reference && reference.type === "conversation" && (
          <Link
            className="text-sm text-muted-foreground hover:underline underline-offset-2"
            href={`/c/${recipient_company_id}/conversations/${reference.id}/messages`}
          >
            {`Conversation ID: ${reference.id}`}
          </Link>
        )}
        <br />
        <p className="text-sm text-muted-foreground">{`${formatDate(
          new Date(created_at)
        )} | ${formatTime(new Date(created_at))}`}</p>
      </div>

      <div>
        {is_read ? (
          <Button
            variant="outline"
            type="button"
            onClick={() => markAsUnreadMutation.trigger()}
            isLoading={markAsUnreadMutation.isMutating}
          >
            Mark as unread
          </Button>
        ) : (
          <Button
            type="button"
            onClick={() => markAsReadMutation.trigger()}
            isLoading={markAsReadMutation.isMutating}
          >
            Mark as read
          </Button>
        )}
      </div>
    </div>
  );
}
