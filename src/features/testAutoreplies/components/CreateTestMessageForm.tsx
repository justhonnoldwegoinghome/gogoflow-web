import _ from "lodash";
import { useMemo, useState } from "react";

import { Button } from "@/components/button";
import { Input, Textarea } from "@/components/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/select";

import { TestMessage } from "../types";

export function CreateTestMessageForm({
  onSubmit,
}: {
  onSubmit: (t: TestMessage) => void;
}) {
  const [text, setText] = useState<TestMessage["text"]>("");

  const [referenceType, setReferenceType] = useState<
    "order" | "product" | null
  >(null);

  const [referenceId, setReferenceId] = useState<string | null>(null);

  const TestMessage = useMemo(() => {
    const reference =
      referenceType && referenceId
        ? {
            type: referenceType,
            id: referenceId,
          }
        : null;

    return {
      text,
      sender_role: "buyer" as TestMessage["sender_role"],
      reference,
    };
  }, [text, referenceType, referenceId]);

  const canSubmit = useMemo(() => {
    const validText = text.length > 0;
    const validReference =
      (referenceType && referenceId) || (!referenceType && !referenceId);

    return validText && validReference;
  }, [text, referenceType, referenceId]);

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(TestMessage);
        }}
      >
        <div className="flex flex-col gap-2 max-w-screen-mobile">
          <div>
            <Textarea
              placeholder="Enter buyer's message"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <div>
            <Select
              onValueChange={(v: "order" | "product" | "none") => {
                if (v === "order") setReferenceType("order");
                else if (v === "product") setReferenceType("product");
                else if (v === "none") setReferenceType(null);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Reference type (optional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="none">None</SelectItem>
                  <SelectItem value="order">Order</SelectItem>
                  <SelectItem value="product">Product</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Input
              type="text"
              placeholder="Reference ID (optional)"
              value={referenceId || ""}
              onChange={(e) => setReferenceId(e.target.value)}
            />
          </div>
          <div>
            <Button
              variant={canSubmit ? "default" : "secondary"}
              disabled={!canSubmit}
            >
              Add message
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
