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

  const [updatedName, setUpdatedName] = useState("");
  const [updatedInstructions, setUpdatedInstructions] = useState("");

  useEffect(() => {
    if (assistantQuery.data) {
      setUpdatedName(assistantQuery.data.name);
      setUpdatedInstructions(assistantQuery.data.instructions);
    }
  }, [assistantQuery.data]);

  const isUpdated = useMemo(() => {
    if (!assistantQuery.data) return false;

    return (
      assistantQuery.data.name !== updatedName ||
      assistantQuery.data.instructions !== updatedInstructions
    );
  }, [assistantQuery.data, updatedName, updatedInstructions]);

  if (!assistantQuery.data) return <Spinner />;

  const { is_active } = assistantQuery.data;

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
      className="flex flex-col gap-4 p-4"
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
