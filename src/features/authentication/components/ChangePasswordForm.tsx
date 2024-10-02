import { useState } from "react";
import { useRouter } from "next/router";

import { useToast } from "@/components/toaster";
import { Button } from "@/components/button";
import { Input } from "@/components/form";

import { useChangePassword } from "../api/changePassword";

export function ChangePasswordForm() {
  const { push } = useRouter();
  const { toast } = useToast();

  const changePasswordMutation = useChangePassword();

  const [password, setPassword] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        changePasswordMutation.trigger({ data: { password } }).then((res) => {
          if (res) {
            push("/me");
            toast({
              variant: "default",
              title: "Password changed.",
            });
          }
        });
      }}
    >
      <div className="p-6 rounded-lg bg-white w-full max-w-screen-tablet  flex flex-col gap-8">
        <h2 className="text-2xl font-semibold text-center">Change password</h2>
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-sm font-medium mb-1 block">
              New password
            </label>
            <Input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div>
          <Button
            isLoading={changePasswordMutation.isMutating}
            disabled={!password}
          >
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
}
