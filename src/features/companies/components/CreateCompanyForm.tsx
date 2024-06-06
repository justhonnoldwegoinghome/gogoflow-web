import { useState } from "react";

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
      <input
        type="text"
        placeholder="Name"
        className="block border border-black"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
