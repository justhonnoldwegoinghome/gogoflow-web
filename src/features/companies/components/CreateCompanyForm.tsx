import { useState } from "react";

import { Button } from "@/components/button";
import { Input } from "@/components/form";

import { useCreateCompany } from "../api/createCompany";

export function CreateCompanyForm() {
  const createCompanyMutation = useCreateCompany();

  const [name, setName] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createCompanyMutation.trigger({ data: { name } });
      }}
    >
      <div className="p-6 rounded-lg bg-white w-full max-w-screen-tablet min-w-[350px] flex flex-col gap-8">
        <h2 className="text-2xl font-semibold text-center">Create company</h2>
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Name</label>
            <Input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div>
          <Button isLoading={createCompanyMutation.isMutating} disabled={!name}>
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
}
