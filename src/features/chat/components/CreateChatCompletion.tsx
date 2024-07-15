import _ from "lodash";
import { useState } from "react";

import { Textarea } from "@/components/form";
import { Button } from "@/components/button";
import { Company } from "@/features/companies";

import { useCreateChatCompletion } from "../api/createChatCompletion";
import { Message } from "../types";

interface CreateChatCompletionProps {
  companyId: Company["id"];
  source: "shopee";
  inputMessageList: Message[];
}

export function CreateChatCompletion({
  companyId,
  source,
  inputMessageList,
}: CreateChatCompletionProps) {
  const createChatCompletionMutation = useCreateChatCompletion({
    companyId,
  });

  const [response, setResponse] = useState("");

  return (
    <div>
      <p className="mb-2 font-semibold">Suggested response:</p>
      <Textarea
        value={response}
        onChange={(e) => setResponse(e.target.value)}
      />
      <br />
      <Button
        onClick={() =>
          createChatCompletionMutation
            .trigger({
              data: { source, companyId, inputMessageList },
            })
            .then((res) => res && setResponse(res.data.output_text))
        }
        isLoading={createChatCompletionMutation.isMutating}
      >
        Generate
      </Button>
    </div>
  );
}
