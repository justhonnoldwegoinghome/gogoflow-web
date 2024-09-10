import { ReactNode, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/dialog";
import { Button } from "@/components/button";

import { useActivateAssistant } from "../api/activateAssistant";
import { Assistant } from "../types";

interface ActivateAssistantDialogProps {
  id: Assistant["id"];
  children: (openDialog: () => void) => ReactNode;
}

export function ActivateAssistantDialog({
  id,
  children,
}: ActivateAssistantDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const activateAssistantMutation = useActivateAssistant({ id });

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        {children(() => setIsOpen(true))}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Activate assistant</DialogTitle>
            <DialogDescription>
              Once you activate the assistant, it will start replying to
              messages automatically.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <div className="flex gap-2 ml-auto">
              <DialogClose asChild>
                <Button type="button" variant="secondary" size="sm">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                type="button"
                variant="default"
                size="sm"
                onClick={() =>
                  activateAssistantMutation
                    .trigger()
                    .then(() => setIsOpen(false))
                }
                isLoading={activateAssistantMutation.isMutating}
              >
                Activate
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
