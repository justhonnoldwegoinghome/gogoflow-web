import _ from "lodash";
import { useMemo, useState } from "react";

import { Button } from "@/components/button";
import { Company } from "@/features/companies";
import { Input } from "@/components/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/select";

import { useCreateTestAutoreply } from "../api/createTestautoreply";
import { TestAutoreply, TestMessage } from "../types";

interface CreateTestAutoreplyProps {
  assistantId: Company["id"];
  source: "shopee";
}

export function CreateTestAutoreply({
  assistantId,
  source,
}: CreateTestAutoreplyProps) {
  const createTestAutoreplyMutation = useCreateTestAutoreply({
    assistantId,
  });

  const [response, setResponse] = useState<TestAutoreply | null>(null);

  const [inputTestMessageList, setInputTestMessageList] = useState<
    TestMessage[]
  >([]);

  return (
    <div>
      <div>
        <CreateTestMessageForm
          onSubmit={(t) =>
            setInputTestMessageList([...inputTestMessageList, t])
          }
        />
      </div>
      <br />
      <div>
        {inputTestMessageList.map((m, i) => (
          <div key={i}>
            <p>{m.text}</p>
          </div>
        ))}
      </div>
      <br />
      <div>
        <Button
          onClick={() =>
            createTestAutoreplyMutation
              .trigger({
                data: {
                  assistantId,
                  source,
                  inputTestMessageList,
                },
              })
              .then((res) => res && setResponse(res.data))
          }
          variant={inputTestMessageList.length === 0 ? "secondary" : "default"}
          disabled={inputTestMessageList.length === 0}
          isLoading={createTestAutoreplyMutation.isMutating}
        >
          Submit
        </Button>
      </div>

      <div>
        {response && (
          <div>
            <p>{response.id}</p>
          </div>
        )}
      </div>
    </div>
  );
}

function CreateTestMessageForm({
  onSubmit,
}: {
  onSubmit: (t: TestMessage) => void;
}) {
  const [text, setText] = useState<TestMessage["text"]>("");

  const [senderRole, setSenderRole] =
    useState<TestMessage["sender_role"]>("seller");

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
  }, [text, senderRole, referenceType, referenceId]);

  const canSubmit = useMemo(() => {
    const validText = text.length > 1;
    const validSenderRole = senderRole === "buyer" || senderRole === "seller";
    const validReference =
      (referenceType && referenceId) || (!referenceType && !referenceId);

    return validText && validSenderRole && validReference;
  }, [text, senderRole, referenceType, referenceId]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(TestMessage);
      }}
    >
      <div className="flex flex-col gap-2 max-w-screen-mobile">
        <div>
          <Input
            type="text"
            placeholder="Text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>
        <div>
          <Select
            onValueChange={(v: TestMessage["sender_role"]) => setSenderRole(v)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sender" />
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
  );
}
