import _ from "lodash";

import { OutputLLMMessage } from "../types";
import { Message } from "@/features/messages";

interface ThreadUIProps {
  messageList: Message[];
  outputLLMMessageList: OutputLLMMessage[];
}

export function ThreadUI({ messageList, outputLLMMessageList }: ThreadUIProps) {
  return (
    <div>
      <div className="flex flex-col gap-4 mb-4">
        {messageList.map((m, i) =>
          m.sender_role === "buyer" ? (
            <div key={i} className="mr-24">
              <BuyerMessageUI testMessage={m} />
            </div>
          ) : (
            <div key={i} className="ml-24">
              <SellerMessageUI testMessage={m} />
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

interface BuyerMessageUIProps {
  testMessage: Message;
}

export function BuyerMessageUI({ testMessage }: BuyerMessageUIProps) {
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

interface SellerMessageUIProps {
  testMessage: Message;
}

export function SellerMessageUI({ testMessage }: SellerMessageUIProps) {
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
