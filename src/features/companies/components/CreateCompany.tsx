import { useState } from "react";

import { TypographyH1 } from "@/components/typography";
import { Button } from "@/components/button";
import { Input } from "@/components/form";

import { useCreateCompany } from "../api/createCompany";

export function CreateCompany() {
  const createCompanyMutation = useCreateCompany();

  const [name, setName] = useState("");

  return (
    <div className="bg-white max-w-screen-mobile mx-auto p-4 rounded-xl flex flex-col items-center gap-12">
      <TypographyH1>Create company</TypographyH1>

      <div className="w-full">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createCompanyMutation.trigger({ data: { name } });
          }}
        >
          <div className="flex flex-col gap-2">
            <Input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Button
              isLoading={createCompanyMutation.isMutating}
              disabled={!name}
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
