import { useState } from "react";

import { TypographyH1 } from "@/components/typography";
import { Input } from "@/components/form";
import { Button } from "@/components/button";

import { useLogInAs } from "../api/logInAs";

export function LogInAsForm() {
  const logInAsMutation = useLogInAs();

  const [userId, setUserId] = useState("");

  return (
    <div className="bg-white mx-auto max-w-screen-mobile p-4 rounded-xl flex flex-col items-center gap-12">
      <TypographyH1>Log in as</TypographyH1>

      <div className="w-full">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            logInAsMutation.trigger({ data: { user_id: userId } });
          }}
        >
          <div className="flex flex-col gap-2">
            <Input
              type="text"
              placeholder="User ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
            <Button disabled={!userId} isLoading={logInAsMutation.isMutating}>
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
