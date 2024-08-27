import { formatDate, formatTime } from "@/utils";

import { TestAutoreply } from "../types";

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
            {testAutoreply.input_test_message_list.map((m, i) => (
              <div key={i}>
                <p>{m.text}</p>
                <p>{`Reference type: ${
                  m.reference ? m.reference.type : "None"
                }`}</p>
                <p>{`Reference ID: ${
                  m.reference ? m.reference.id : "None"
                }`}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <span className="font-medium">Output</span>
          <div className="flex flex-col gap-4">
            {testAutoreply.output_llm_message_list.map((o, i) => (
              <p key={i}>{o.content}</p>
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
