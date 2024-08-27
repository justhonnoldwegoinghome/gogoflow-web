import { useState } from "react";

import { Button } from "@/components/button";
import { FormContainer, Input, Textarea } from "@/components/form";
import { Company } from "@/features/companies";

import { useCreateAssistant } from "../api/createAssistant";

interface CreateAssistantFormProps {
  companyId: Company["id"];
}

export function CreateAssistantForm({ companyId }: CreateAssistantFormProps) {
  const createAssistantMutation = useCreateAssistant({ companyId });

  const [name, setName] = useState("My chatbot");
  const [instructions, setInstructions] = useState(
    "You are a friendly assistant."
  );

  return (
    <FormContainer
      title="Create bot"
      form={
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
          </div>
        </form>
      }
      submitButton={
        <Button
          isLoading={createAssistantMutation.isMutating}
          disabled={!name || !instructions}
        >
          Create
        </Button>
      }
    />
  );
}
