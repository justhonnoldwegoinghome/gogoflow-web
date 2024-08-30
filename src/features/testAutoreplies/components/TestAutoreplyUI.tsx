import { formatDate, formatTime } from "@/utils";

import { OutputLLMMessage, TestAutoreply, TestMessage } from "../types";

interface TestAutoreplyCardUIProps {
  testAutoreply: TestAutoreply;
}

export function TestAutoreplyCardUI({
  testAutoreply,
}: TestAutoreplyCardUIProps) {
  return (
    <div className="p-4 rounded-lg border">
      <div className="flex flex-col gap-4">
        <div>
          <span className="font-medium">Bot ID</span>
          <p>{testAutoreply.assistant_id}</p>
        </div>
        <div>
          <span className="font-medium">Timestamp</span>
          <p>{`${formatDate(new Date(testAutoreply.created_at))} | ${formatTime(
            new Date(testAutoreply.created_at)
          )}`}</p>
        </div>
        <div>
          <span className="font-medium">Input</span>
          <div className="flex flex-col gap-4">
            {testAutoreply.input_test_message_list.map((m, i) =>
              m.sender_role === "buyer" ? (
                <BuyerTestMessageUI key={i} testMessage={m} />
              ) : (
                <SellerTestMessageUI key={i} testMessage={m} />
              )
            )}
          </div>
        </div>
        <div>
          <span className="font-medium">Output</span>
          <div className="flex flex-col gap-4">
            {testAutoreply.output_llm_message_list.map((o, i) => (
              <OutputLLMMessageUI key={i} outputLLMMessage={o} />
            ))}
          </div>
        </div>
        <div>
          <span className="font-medium">Action required</span>
          <p>{testAutoreply.is_require_action ? "Yes" : "No"}</p>
        </div>
      </div>
    </div>
  );
}

function BuyerTestMessageUI({ testMessage }: { testMessage: TestMessage }) {
  const { text, reference } = testMessage;
  return (
    <div className="p-3 rounded-xl border border-primary">
      <p>{text}</p>
      <p>{`Reference type: ${reference ? reference.type : "None"}`}</p>
      <p>{`Reference ID: ${reference ? reference.id : "None"}`}</p>
    </div>
  );
}

function SellerTestMessageUI({ testMessage }: { testMessage: TestMessage }) {
  const { text, reference } = testMessage;
  return (
    <div className="bg-secondary p-3 rounded-xl">
      <p>{text}</p>
      <p>{`Reference type: ${reference ? reference.type : "None"}`}</p>
      <p>{`Reference ID: ${reference ? reference.id : "None"}`}</p>
    </div>
  );
}

function OutputLLMMessageUI({
  outputLLMMessage,
}: {
  outputLLMMessage: OutputLLMMessage;
}) {
  const { content } = outputLLMMessage;

  return (
    <div className="bg-primary text-primary-foreground p-3 rounded-xl">
      <p>{content}</p>
    </div>
  );
}
