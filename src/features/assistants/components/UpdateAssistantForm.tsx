import { useEffect, useMemo, useState } from "react";

import { TypographySmall } from "@/components/typography";
import { FormContainer, Input, Textarea } from "@/components/form";
import { Button } from "@/components/button";

import { useUpdateAssistant } from "../api/updateAssistant";
import { Assistant } from "../types";

// 20240824 note
// Have to refresh `updatedName` and `updatedInstructions` whenever `assistant` changes.
// This is because `UpdateAssistant` doesn't get dismounted when user navigates to different assistant.
// Alternative is to just fetch assistant from within UpdateAssistant.
// Re-visit when <Form/> is added.

interface UpdateAssistantFormProps {
  id: Assistant["id"];
  assistant: Assistant;
}

export function UpdateAssistantForm({
  id,
  assistant,
}: UpdateAssistantFormProps) {
  const updateAssistantMutation = useUpdateAssistant({
    id,
  });

  const [updatedName, setUpdatedName] = useState(assistant.name);
  useEffect(() => setUpdatedName(assistant.name), [assistant]);

  const [updatedInstructions, setUpdatedInstructions] = useState(
    assistant.instructions
  );
  useEffect(() => setUpdatedInstructions(assistant.instructions), [assistant]);

  const isUpdated = useMemo(
    () =>
      assistant.name !== updatedName ||
      assistant.instructions !== updatedInstructions,
    [assistant, updatedName, updatedInstructions]
  );

  const { is_active } = assistant;

  return (
    <FormContainer
      form={
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateAssistantMutation.trigger({
              id,
              data: {
                name: updatedName,
                instructions: updatedInstructions,
              },
            });
          }}
          className="flex flex-col gap-4"
        >
          <div>
            <TypographySmall>Name</TypographySmall>
            <Input
              value={updatedName}
              onChange={(e) => setUpdatedName(e.currentTarget.value)}
            />
          </div>
          <div>
            <TypographySmall>Active</TypographySmall>
            <Input value={is_active ? "Yes" : "No"} disabled />
          </div>
          <div>
            <TypographySmall>Instructions</TypographySmall>
            <Textarea
              value={updatedInstructions}
              onChange={(e) => setUpdatedInstructions(e.currentTarget.value)}
            />
          </div>
        </form>
      }
      submitButton={
        <Button
          variant={isUpdated ? "default" : "secondary"}
          disabled={!isUpdated}
          isLoading={false}
        >
          Update
        </Button>
      }
    />
  );
}
