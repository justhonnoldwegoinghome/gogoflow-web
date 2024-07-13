import clsx from "clsx";

import { format } from "@/utils/format";

import { Message } from "../types";

interface MessageCardUIProps {
  message: Message;
}

export function MessageCardUI({ message }: MessageCardUIProps) {
  const { sent_at, sender_role, text, is_supported } = message;

  return (
    <div
      className={clsx("p-4 rounded-lg border", {
        "border-blue-500 text-blue-500": sender_role === "seller",
      })}
    >
      <p>{is_supported ? text : "UNSUPPORTED"}</p>

      {message.reference && (
        <div className="mt-4 text-gray-600 text-sm">
          <p>
            {message.reference.type === "product"
              ? `Product ID:${message.reference.id}`
              : `Order ID: ${message.reference.id}`}
          </p>
        </div>
      )}

      <div className="mt-4 text-end text-gray-600 text-sm">
        <p>{format.date(new Date(sent_at))}</p>
        <p>{format.time(new Date(sent_at))}</p>
      </div>
    </div>
  );
}
