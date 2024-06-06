import { ReactNode } from "react";

import { User } from "@/features/users";

import { useAuthStore } from "../stores/useAuthStore";

interface LoggedInProps {
  children: (userId: User["id"]) => ReactNode;
}

export function LoggedIn({ children }: LoggedInProps) {
  const isLoaded = useAuthStore((s) => s.isLoaded);
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const userId = useAuthStore((s) => s.userId);

  if (!isLoaded) return <div>Spinner</div>;

  if (isLoggedIn && userId) {
    return children(userId as User["id"]);
  }

  return <div>Forbidden</div>;
}
