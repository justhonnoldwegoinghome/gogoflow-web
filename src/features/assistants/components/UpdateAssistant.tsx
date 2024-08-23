import { useEffect, useMemo, useState } from "react";

import { TypographySmall } from "@/components/typography";
import { Spinner } from "@/components/spinner";
import { Input, Textarea } from "@/components/form";
import { Button } from "@/components/button";

import { useAssistant } from "../api/getAssistant";
import { useUpdateAssistant } from "../api/updateAssistant";
import { Assistant } from "../types";

interface UpdateAssistantProps {
  id: Assistant["id"];
}

export function UpdateAssistant({ id }: UpdateAssistantProps) {
  const assistantQuery = useAssistant({ id });
  const updateAssistantMutation = useUpdateAssistant({
    id,
  });

  const [updatedInstructions, setUpdatedInstructions] = useState("");
  useEffect(() => {
    if (assistantQuery.data)
      setUpdatedInstructions(assistantQuery.data.instructions);
  }, [assistantQuery.data]);

  const isUpdated = useMemo(
    () =>
      assistantQuery.data &&
      assistantQuery.data.instructions !== updatedInstructions,
    [assistantQuery.data, updatedInstructions]
  );

  if (!assistantQuery.data) return <Spinner />;

  const { name, created_at, is_active, instructions } = assistantQuery.data;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        updateAssistantMutation.trigger({
          id,
          data: {
            instructions: updatedInstructions,
          },
        });
      }}
      className="flex flex-col gap-4"
    >
      <div>
        <TypographySmall>Name</TypographySmall>
        <Input value={name} disabled />
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
      <div>
        <Button
          variant={isUpdated ? "default" : "secondary"}
          disabled={!isUpdated}
          isLoading={false}
        >
          Update
        </Button>
      </div>
    </form>
  );
}
