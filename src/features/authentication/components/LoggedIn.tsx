import { ReactElement, ReactNode } from "react";

import { Spinner } from "@/components/spinner";
import { User } from "@/features/users";

import { useAuthStore } from "../stores/useAuthStore";

interface LoggedInProps {
  children: (userId: User["id"]) => ReactNode;
  fallback?: ReactElement;
}

export function LoggedIn({ children, fallback }: LoggedInProps) {
  const isLoaded = useAuthStore((s) => s.isLoaded);
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const userId = useAuthStore((s) => s.userId);

  if (!isLoaded) return <Spinner />;

  if (isLoggedIn && userId) {
    return children(userId as User["id"]);
  }

  return fallback || <div>Forbidden</div>;
}
