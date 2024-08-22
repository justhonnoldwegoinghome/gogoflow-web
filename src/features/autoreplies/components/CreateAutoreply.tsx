import _ from "lodash";
import { useState } from "react";

import { Button } from "@/components/button";
import { Company } from "@/features/companies";
import { Message } from "@/features/messages";

import { useCreateAutoreply } from "../api/createAutoreply";
import { Autoreply } from "../types";
import { AutoreplyUI } from "./AutoreplyUI";

interface CreateAutoreplyProps {
  companyId: Company["id"];
  source: "shopee";
  inputMessageList: Message[];
}

export function CreateAutoreply({
  companyId,
  source,
  inputMessageList,
}: CreateAutoreplyProps) {
  const createAutoreplyMutation = useCreateAutoreply({
    companyId,
  });

  const [botResponse, setAutoreply] = useState<Autoreply | null>(null);

  return (
    <div>
      <Button
        onClick={() =>
          createAutoreplyMutation
            .trigger({
              data: { source, companyId, inputMessageList },
            })
            .then((res) => res && setAutoreply(res.data))
        }
        isLoading={createAutoreplyMutation.isMutating}
      >
        Ask bot
      </Button>
      <br />
      <br />
      {botResponse && <AutoreplyUI botResponse={botResponse} />}
    </div>
  );
}
