import { useState } from "react";

import { Button } from "@/components/button";
import { Input } from "@/components/form";

import { useRequestPasswordReset } from "../api/requestPasswordReset";

export function RequestPasswordResetForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const requestPasswordResetMutation = useRequestPasswordReset();

  const [email, setEmail] = useState("");

  if (isSubmitted)
    return (
      <div>
        <h1 className="text-2xl font-semibold text-center">
          Reset your password
        </h1>
        <div className="mt-8 p-6 bg-secondary rounded-lg max-w-screen-mobile mx-auto">
          <p>
            Check your email for a link to reset your password. If it doesn’t
            appear within a few minutes, check your spam folder.
          </p>
        </div>
      </div>
    );

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        requestPasswordResetMutation
          .trigger({ data: { email } })
          .then(() => setIsSubmitted(true));
      }}
    >
      <div className="p-6 rounded-lg bg-white w-full max-w-screen-tablet  flex flex-col gap-8">
        <h2 className="text-2xl font-semibold text-center">
          Request password reset
        </h2>
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium mb-1 block">Email</label>
            <Input
              type="text"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div>
          <Button
            isLoading={requestPasswordResetMutation.isMutating}
            disabled={!email}
          >
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
}
