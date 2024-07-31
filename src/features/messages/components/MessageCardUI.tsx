import clsx from "clsx";

import { formatDate, formatTime } from "@/utils";

import { Message } from "../types";

interface MessageCardUIProps {
  message: Message;
}

export function MessageCardUI({ message }: MessageCardUIProps) {
  const { sent_at, sender_role, text, is_supported } = message;

  return (
    <div
      className={clsx("p-4 rounded-lg", {
        "border border-primary": sender_role === "buyer",
        "text-secondary-foreground bg-secondary": sender_role === "seller",
      })}
    >
      <p>{is_supported ? text : "UNSUPPORTED"}</p>

      {message.reference && (
        <div className="mt-4 text-sm">
          <p>
            {message.reference.type === "product"
              ? `Product ID:${message.reference.id}`
              : `Order ID: ${message.reference.id}`}
          </p>
        </div>
      )}

      <div className="mt-4 text-end text-xs">
        <p>{formatDate(new Date(sent_at))}</p>
        <p>{formatTime(new Date(sent_at))}</p>
      </div>
    </div>
  );
}
