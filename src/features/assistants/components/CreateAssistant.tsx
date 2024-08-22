import { useState } from "react";

import { TypographyH1 } from "@/components/typography";
import { Button } from "@/components/button";
import { Input, Textarea } from "@/components/form";
import { Company } from "@/features/companies";

import { useCreateAssistant } from "../api/createAssistant";

interface CreateAssistantProps {
  companyId: Company["id"];
}

export function CreateAssistant({ companyId }: CreateAssistantProps) {
  const createAssistantMutation = useCreateAssistant({ companyId });

  const [name, setName] = useState("My chatbot");
  const [instructions, setInstructions] = useState(
    "You are a friendly assistant."
  );

  return (
    <div className="bg-white max-w-screen-mobile mx-auto p-4 rounded-xl flex flex-col items-center gap-12">
      <TypographyH1>Create assistant</TypographyH1>

      <div className="w-full">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createAssistantMutation.trigger({
              data: { company_id: companyId, name, instructions },
            });
          }}
        >
          <div className="flex flex-col gap-2">
            <Input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Textarea
              placeholder="Instructions"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
            />
            <Button
              isLoading={createAssistantMutation.isMutating}
              disabled={!name || !instructions}
            >
              Create
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
