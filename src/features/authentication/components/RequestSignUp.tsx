import { useState } from "react";

import { Button } from "@/components/button";
import { TypographyH1 } from "@/components/typography";
import { Input } from "@/components/form";

import { useRequestSignUp } from "../api/requestSignUp";

export function RequestSignUp() {
  const requestSignUpMutation = useRequestSignUp();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="bg-white mx-auto max-w-screen-mobile p-4 rounded-xl flex flex-col items-center gap-12">
      <TypographyH1>Sign up</TypographyH1>

      <div className="w-full">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            requestSignUpMutation.trigger({ data: { email, password } });
          }}
        >
          <div className="flex flex-col gap-2">
            <Input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value.toLocaleLowerCase())}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              disabled={!email || !password}
              isLoading={requestSignUpMutation.isMutating}
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
