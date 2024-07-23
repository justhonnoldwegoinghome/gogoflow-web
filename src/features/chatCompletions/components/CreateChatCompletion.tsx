import _ from "lodash";
import { useState } from "react";

import { Textarea } from "@/components/form";
import { Button } from "@/components/button";
import { Company } from "@/features/companies";
import { Message } from "@/features/messages";

import { useCreateChatCompletion } from "../api/createChatCompletion";
import { ChatCompletion } from "../types";

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

  const [outputTextList, setOutputTextList] = useState<
    ChatCompletion["output_text_list"]
  >([]);

  return (
    <div>
      <p className="mb-2 font-semibold">Suggested response:</p>
      <div className="flex flex-col gap-4">
        {outputTextList.length === 0 ? (
          <Textarea />
        ) : (
          outputTextList.map((o, i) => <Textarea key={i} value={o} />)
        )}
      </div>
      <br />
      <Button
        onClick={() =>
          createChatCompletionMutation
            .trigger({
              data: { source, companyId, inputMessageList },
            })
            .then((res) => res && setOutputTextList(res.data.output_text_list))
        }
        isLoading={createChatCompletionMutation.isMutating}
      >
        Generate
      </Button>
    </div>
  );
}
