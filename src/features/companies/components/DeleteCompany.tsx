import { useState } from "react";

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

interface DeleteCompanyProps {
  id: Company["id"];
  userId: User["id"];
}

export function DeleteCompany({ id, userId }: DeleteCompanyProps) {
  const [open, setOpen] = useState(false);
  const deleteCompanyMutation = useDeleteCompany({ id, userId });

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="destructive" size="sm">
            Delete company
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete company</DialogTitle>
            <DialogDescription>
              Once you delete your account, there is no going back. Please be
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
                deleteCompanyMutation.trigger().then(() => setOpen(false))
              }
              isLoading={deleteCompanyMutation.isMutating}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
