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

import { useDeactivateAssistant } from "../api/deactivateAssistant";
import { Assistant } from "../types";

interface DeactivateAssistantDialogProps {
  id: Assistant["id"];
  children: (openDialog: () => void) => ReactNode;
}

export function DeactivateAssistantDialog({
  id,
  children,
}: DeactivateAssistantDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const deactivateAssistantMutation = useDeactivateAssistant({ id });

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        {children(() => setIsOpen(true))}
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Deactivate bot</DialogTitle>
            <DialogDescription>
              Once you deactivate the bot, it will stop replying to messages
              automatically.
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
                  deactivateAssistantMutation
                    .trigger()
                    .then(() => setIsOpen(false))
                }
                isLoading={deactivateAssistantMutation.isMutating}
              >
                Deactivate
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
