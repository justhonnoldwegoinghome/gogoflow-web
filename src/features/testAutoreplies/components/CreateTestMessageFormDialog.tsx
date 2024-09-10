import _ from "lodash";
import { ReactNode, useMemo, useState } from "react";

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
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/dialog";

import { TestMessage } from "../types";

interface CreateTestAutoreplyFormDialogProps {
  onSubmit: (t: TestMessage) => void;
  children: (openDialog: () => void) => ReactNode;
}

export function CreateTestMessageFormDialog({
  onSubmit,
  children,
}: CreateTestAutoreplyFormDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const [text, setText] = useState<TestMessage["text"]>("");

  const [senderRole, setSenderRole] =
    useState<TestMessage["sender_role"]>("buyer");

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
      sender_role: senderRole,
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
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {children(() => setIsOpen(true))}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add test message</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit(TestMessage);
            setText("");
            setReferenceType(null);
            setReferenceId(null);
            setSenderRole("buyer");
            setIsOpen(false);
          }}
        >
          <div className="flex flex-col gap-8 justify-between h-[80vh]">
            <div className="flex flex-col gap-4 overflow-auto px-1 pb-1">
              <div>
                <label className="text-sm font-medium mb-1 block">Text</label>
                <Textarea
                  placeholder="May I know how do I use this product?"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">From</label>
                <Select
                  defaultValue={senderRole}
                  onValueChange={(s: TestMessage["sender_role"]) =>
                    setSenderRole(s)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="buyer">Buyer</SelectItem>
                      <SelectItem value="seller">Seller</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Source</label>
                <Input value="Shopee" disabled />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">
                  Reference type
                </label>
                <Select
                  onValueChange={(v: "order" | "product" | "none") => {
                    if (v === "order") setReferenceType("order");
                    else if (v === "product") setReferenceType("product");
                    else if (v === "none") setReferenceType(null);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Optional" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="product">Product</SelectItem>
                      <SelectItem value="order">Order</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">
                  Reference ID
                </label>
                <Input
                  placeholder="Optional"
                  value={referenceId || ""}
                  onChange={(e) => setReferenceId(e.target.value)}
                  disabled={referenceType === null}
                />
              </div>
            </div>

            <DialogFooter>
              <div className="flex gap-2 ml-auto">
                <DialogClose asChild>
                  <Button type="button" variant="secondary" size="sm">
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  variant={canSubmit ? "default" : "secondary"}
                  disabled={!canSubmit}
                  size="sm"
                >
                  Add message
                </Button>
              </div>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
