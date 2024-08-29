import { useState } from "react";

import { TypographyH1 } from "@/components/typography";
import { Button } from "@/components/button";
import { FormContainer, Input } from "@/components/form";

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
      <FormContainer
        title="Create company"
        form={
          <div>
            <Input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        }
        submitButton={
          <Button isLoading={createCompanyMutation.isMutating} disabled={!name}>
            Submit
          </Button>
        }
      />
    </form>
  );
}
