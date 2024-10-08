import { useCallback, useState } from "react";
import { useRouter } from "next/router";

import { Button } from "@/components/button";
import { useToast } from "@/components/toaster";
import { Input } from "@/components/form";

import { useCompletePasswordReset } from "../api/completePasswordReset";

interface CompletePasswordResetFormProps {
  token: string;
}

export function CompletePasswordResetForm({
  token,
}: CompletePasswordResetFormProps) {
  const { push } = useRouter();
  const { toast } = useToast();
  const onSuccess = useCallback(() => {
    push("/auth/log-in");
    toast({
      title: "Password changed",
      description: "Log in with your new password",
    });
  }, []);

  const completePasswordResetMutation = useCompletePasswordReset({ onSuccess });

  const [password, setPassword] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        completePasswordResetMutation.trigger({ data: { token, password } });
      }}
    >
      <div className="p-6 rounded-lg bg-white w-full max-w-screen-tablet  flex flex-col gap-8">
        <h2 className="text-2xl font-semibold text-center">
          Complete password reset
        </h2>
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
            isLoading={completePasswordResetMutation.isMutating}
            disabled={!password}
          >
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
}
