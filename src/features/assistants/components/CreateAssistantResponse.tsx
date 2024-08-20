import _ from "lodash";
import { useState } from "react";

import { Button } from "@/components/button";
import { Company } from "@/features/companies";
import { Message } from "@/features/messages";

import { useCreateAssistantResponse } from "../api/createAssistantResponse";
import { AssistantResponse } from "../types";
import { AssistantResponseUI } from "./AssistantResponseUI";

interface CreateAssistantResponseProps {
  companyId: Company["id"];
  source: "shopee";
  inputMessageList: Message[];
}

export function CreateAssistantResponse({
  companyId,
  source,
  inputMessageList,
}: CreateAssistantResponseProps) {
  const createAssistantResponseMutation = useCreateAssistantResponse({
    companyId,
  });

  const [botResponse, setAssistantResponse] =
    useState<AssistantResponse | null>(null);

  return (
    <div>
      {/* <p className="mb-2 font-semibold">Suggested response:</p> */}
      {/* {outputTextList.length === 0 ? (
          <Textarea />
        ) : (
          outputTextList.map((o, i) => <Textarea key={i} value={o} disabled />)
        )} */}

      <Button
        onClick={() =>
          createAssistantResponseMutation
            .trigger({
              data: { source, companyId, inputMessageList },
            })
            .then((res) => res && setAssistantResponse(res.data))
        }
        isLoading={createAssistantResponseMutation.isMutating}
      >
        Ask bot
      </Button>
      <br />
      <br />
      {botResponse && <AssistantResponseUI botResponse={botResponse} />}
    </div>
  );
}
