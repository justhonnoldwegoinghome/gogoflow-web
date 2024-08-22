import { useState } from "react";
import { Trash2 } from "lucide-react";

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

interface DeleteAssistantProps {
  id: Assistant["id"];
  companyId: Company["id"];
}

export function DeleteAssistant({ id, companyId }: DeleteAssistantProps) {
  const [open, setOpen] = useState(false);

  const deleteAssistantMutation = useDeleteAssistant({ id, companyId });

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="destructive">
            <div className="flex items-center gap-2">
              <Trash2 size={16} />
              <p>Delete</p>
            </div>
          </Button>
        </DialogTrigger>
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
                deleteAssistantMutation.trigger().then(() => setOpen(false))
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
