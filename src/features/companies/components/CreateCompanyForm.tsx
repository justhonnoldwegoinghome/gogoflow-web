import { useState } from "react";

import { TypographyH1 } from "@/components/typography";
import { Button } from "@/components/button";
import { FormContainer, Input } from "@/components/form";

import { useCreateCompany } from "../api/createCompany";

export function CreateCompanyForm() {
  const createCompanyMutation = useCreateCompany();

  const [name, setName] = useState("");

  return (
    <FormContainer
      title="Create company"
      form={
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createCompanyMutation.trigger({ data: { name } });
          }}
        >
          <Input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </form>
      }
      submitButton={
        <Button isLoading={createCompanyMutation.isMutating} disabled={!name}>
          Submit
        </Button>
      }
    />
  );
}
