import { ReactNode, useState } from "react";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/dialog";
import { Button } from "@/components/button";
import { Company } from "@/features/companies";

import { useDeleteAssistant } from "../api/deleteAssistant";
import { Assistant } from "../types";

interface DeleteAssistantDialogProps {
  id: Assistant["id"];
  companyId: Company["id"];
  children: (openDialog: () => void) => ReactNode;
}

export function DeleteAssistantDialog({
  id,
  companyId,
  children,
}: DeleteAssistantDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const deleteAssistantMutation = useDeleteAssistant({ id, companyId });

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>{children(() => setIsOpen(true))}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete bot</DialogTitle>
            <DialogDescription>
              Once you delete the bot, there is no going back. Please be
              certain.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="button"
              variant="destructive"
              onClick={() =>
                deleteAssistantMutation.trigger().then(() => setIsOpen(false))
              }
              isLoading={deleteAssistantMutation.isMutating}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
