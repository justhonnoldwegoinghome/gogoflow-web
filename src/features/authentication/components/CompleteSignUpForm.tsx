import { useEffect } from "react";

import { useCompleteSignUp } from "../api/completeSignUp";

interface CompleteSignUpFormProps {
  token: string;
}

export function CompleteSignUpForm({ token }: CompleteSignUpFormProps) {
  const completeSignUpMutation = useCompleteSignUp();

  useEffect(() => {
    completeSignUpMutation.trigger({ data: { token } });
  }, []);

  return <div>Spinner</div>;
}
