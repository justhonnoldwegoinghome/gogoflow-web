import clsx from "clsx";

import { TestMessage } from "../types";

interface TestMessageCardUIProps {
  testMessage: TestMessage;
}

export function TestMessageCardUI({ testMessage }: TestMessageCardUIProps) {
  const { text, sender_role, reference } = testMessage;

  return (
    <div
      className={clsx("p-2 rounded-lg", {
        "border border-primary": sender_role === "buyer",
        "text-secondary-foreground bg-secondary": sender_role === "seller",
      })}
    >
      <p>{text}</p>

      {reference && (
        <div className="mt-2 text-sm">
          <p>
            {reference.type === "product"
              ? `Product ID:${reference.id}`
              : `Order ID: ${reference.id}`}
          </p>
        </div>
      )}
    </div>
  );
}
