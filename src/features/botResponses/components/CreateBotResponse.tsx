import _ from "lodash";
import { useState } from "react";

import { Button } from "@/components/button";
import { Company } from "@/features/companies";
import { Message } from "@/features/messages";

import { useCreateBotResponse } from "../api/createBotResponse";
import { BotResponse } from "../types";
import { BotResponseUI } from "./BotResponseUI";

interface CreateBotResponseProps {
  companyId: Company["id"];
  source: "shopee";
  inputMessageList: Message[];
}

export function CreateBotResponse({
  companyId,
  source,
  inputMessageList,
}: CreateBotResponseProps) {
  const createBotResponseMutation = useCreateBotResponse({
    companyId,
  });

  const [botResponse, setBotResponse] = useState<BotResponse | null>(null);

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
          createBotResponseMutation
            .trigger({
              data: { source, companyId, inputMessageList },
            })
            .then((res) => res && setBotResponse(res.data))
        }
        isLoading={createBotResponseMutation.isMutating}
      >
        Ask bot
      </Button>
      <br />
      <br />
      {botResponse && <BotResponseUI botResponse={botResponse} />}
    </div>
  );
}
