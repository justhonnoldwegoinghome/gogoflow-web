import clsx from "clsx";

import { Message } from "../types";

interface MessageCardUIProps {
  message: Message;
}

export function MessageCardUI({ message }: MessageCardUIProps) {
  const { sent_at, sender_role, text } = message;

  return (
    <div
      className={clsx("flex flex-col gap-2 p-4 rounded-lg border", {
        "border-blue-500 text-blue-500": sender_role === "seller",
      })}
    >
      <p>{text ? text : "UNSUPPORTED"}</p>
      <div className="text-gray-600 text-sm">
        <p>{`Sent at: ${sent_at}`}</p>
        <p>{`Sent by: ${sender_role}`}</p>
      </div>
    </div>
  );
}
