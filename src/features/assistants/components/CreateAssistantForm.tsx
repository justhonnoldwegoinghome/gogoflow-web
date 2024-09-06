import { useState } from "react";

import { Button } from "@/components/button";
import { Input, Textarea } from "@/components/form";
import { Company } from "@/features/companies";

import { useCreateAssistant } from "../api/createAssistant";

interface CreateAssistantFormProps {
  companyId: Company["id"];
}

export function CreateAssistantForm({ companyId }: CreateAssistantFormProps) {
  const createAssistantMutation = useCreateAssistant({ companyId });

  const [name, setName] = useState("Chat assistant");
  const [instructions, setInstructions] = useState(
    "You are a friendly assistant."
  );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createAssistantMutation.trigger({
          data: { company_id: companyId, name, instructions },
        });
      }}
    >
      <div className="p-6 rounded-lg bg-white w-full max-w-screen-tablet  flex flex-col gap-8">
        <h2 className="text-2xl font-semibold text-center">Create assistant</h2>
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Name</label>
            <Input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">
              Instructions
            </label>
            <Textarea
              placeholder="Instructions"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
            />
          </div>
        </div>
        <div>
          <Button
            isLoading={createAssistantMutation.isMutating}
            disabled={!name || !instructions}
          >
            Create
          </Button>
        </div>
      </div>
    </form>
  );
}
