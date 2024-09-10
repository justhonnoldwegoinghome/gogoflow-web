import { useEffect, useMemo, useState } from "react";

import { Input, Textarea } from "@/components/form";
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
    >
      <div className="rounded-lg bg-white w-full max-w-screen-tablet  flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Name</label>
            <Input
              value={updatedName}
              onChange={(e) => setUpdatedName(e.currentTarget.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">
              Instructions
            </label>
            <Textarea
              value={updatedInstructions}
              onChange={(e) => setUpdatedInstructions(e.currentTarget.value)}
            />
          </div>
        </div>
        <div>
          <Button
            variant={isUpdated ? "default" : "secondary"}
            disabled={!isUpdated}
            isLoading={false}
          >
            Update
          </Button>
        </div>
      </div>
    </form>
  );
}
