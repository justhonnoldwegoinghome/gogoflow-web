import { useEffect } from "react";

import { Spinner } from "@/components/spinner";

import { useCompleteSignUp } from "../api/completeSignUp";

interface CompleteSignUpProps {
  token: string;
}

export function CompleteSignUp({ token }: CompleteSignUpProps) {
  const completeSignUpMutation = useCompleteSignUp();

  useEffect(() => {
    completeSignUpMutation.trigger({ data: { token } });
  }, []);

  return <Spinner />;
}
