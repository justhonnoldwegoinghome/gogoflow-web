import { useEffect } from "react";
import { useRouter } from "next/router";

import { useAuthStore } from "@/features/authentication";
import { Spinner } from "@/components/spinner";

export default function Page() {
  const { push } = useRouter();

  const { isLoaded, isLoggedIn } = useAuthStore();

  useEffect(() => {
    if (!isLoaded) return;
    else if (isLoggedIn) push("/me");
    else push("/landing");
  }, [isLoaded, isLoggedIn]);

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <Spinner />
    </div>
  );
}
