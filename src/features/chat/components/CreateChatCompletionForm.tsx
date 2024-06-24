import _ from "lodash";
import { useState } from "react";

import { Company } from "@/features/companies";

import { useCreateChatCompletion } from "../api/createChatCompletion";
import { Message } from "../types";

interface CreateChatCompletionFormProps {
  companyId: Company["id"];
  inputMessageList: Message[];
}

export function CreateChatCompletionForm({
  companyId,
  inputMessageList,
}: CreateChatCompletionFormProps) {
  const createChatCompletionMutation = useCreateChatCompletion({
    companyId,
  });

  const [response, setResponse] = useState("");

  return (
    <div>
      <p className="mb-2 font-semibold">Response:</p>
      <textarea
        value={response}
        onChange={(e) => setResponse(e.target.value)}
        className="block border"
      />
      <br />
      <button
        className="p-3 bg-green-200 block"
        onClick={() =>
          createChatCompletionMutation
            .trigger({
              data: { companyId, inputMessageList },
            })
            .then((res) => res && setResponse(res.data.output_text))
        }
      >
        {createChatCompletionMutation.isMutating
          ? "Spinner"
          : "Generate response"}
      </button>
      <br />
      <button className="p-3 bg-blue-300 block">Send response</button>
    </div>
  );
}
