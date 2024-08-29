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
import { User } from "@/features/users";

import { useDeleteCompany } from "../api/deleteCompany";
import { Company } from "../types";

interface DeleteCompanyDialogProps {
  id: Company["id"];
  userId: User["id"];
  children: (openDialog: () => void) => ReactNode;
}

export function DeleteCompanyDialog({
  id,
  userId,
  children,
}: DeleteCompanyDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const deleteCompanyMutation = useDeleteCompany({ id, userId });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children(() => setIsOpen(true))}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete company</DialogTitle>
          <DialogDescription>
            Once you delete your company, there is no going back. Please be
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
              deleteCompanyMutation.trigger().then(() => setIsOpen(false))
            }
            isLoading={deleteCompanyMutation.isMutating}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
