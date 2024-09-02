import _ from "lodash";

import { OutputLLMMessage, TestMessage } from "../types";

interface TestThreadUIProps {
  testMessageList: TestMessage[];
  outputLLMMessageList: OutputLLMMessage[];
}

export function TestThreadUI({
  testMessageList,
  outputLLMMessageList,
}: TestThreadUIProps) {
  return (
    <div>
      <div className="flex flex-col gap-4 mb-4">
        {testMessageList.map((m, i) =>
          m.sender_role === "buyer" ? (
            <div key={i} className="mr-24">
              <BuyerTestMessageUI testMessage={m} />
            </div>
          ) : (
            <div key={i} className="ml-24">
              <SellerTestMessageUI testMessage={m} />
            </div>
          )
        )}
      </div>
      <div>
        <div className="flex flex-col gap-4">
          {outputLLMMessageList.map((o, i) => (
            <div key={i} className="ml-24">
              <OutputLLMMessageUI outputLLMMessage={o} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface BuyerTestMessageUIProps {
  testMessage: TestMessage;
}

export function BuyerTestMessageUI({ testMessage }: BuyerTestMessageUIProps) {
  const { text, reference } = testMessage;
  return (
    <div className="p-3 border border-primary rounded-xl w-fit">
      <p>{text}</p>
      {reference && (
        <div className="text-sm text-muted-foreground">
          <p>{`Reference type: ${reference.type}`}</p>
          <p>{`Reference ID: ${reference.id}`}</p>
        </div>
      )}
    </div>
  );
}

interface SellerTestMessageUIProps {
  testMessage: TestMessage;
}

export function SellerTestMessageUI({ testMessage }: SellerTestMessageUIProps) {
  const { text, reference } = testMessage;
  return (
    <div className="p-3 bg-secondary rounded-xl w-fit">
      <p>{text}</p>
      {reference && (
        <div className="text-sm text-muted-foreground">
          <p>{`Reference type: ${reference.type}`}</p>
          <p>{`Reference ID: ${reference.id}`}</p>
        </div>
      )}
    </div>
  );
}

interface OutputLLMMessageUIProps {
  outputLLMMessage: OutputLLMMessage;
}

export function OutputLLMMessageUI({
  outputLLMMessage,
}: OutputLLMMessageUIProps) {
  const { content } = outputLLMMessage;

  return (
    <div className="bg-primary text-primary-foreground p-3 rounded-xl w-fit">
      <p>{content}</p>
    </div>
  );
}
