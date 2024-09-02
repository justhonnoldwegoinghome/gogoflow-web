import { ReactElement, ReactNode } from "react";
import { useRouter } from "next/router";

import { Spinner } from "@/components/spinner";
import { User } from "@/features/users";

import { useAuthStore } from "../stores/useAuthStore";

interface LoggedInProps {
  children: (userId: User["id"]) => ReactNode;
  loader?: ReactElement;
}

export function LoggedIn({ children, loader }: LoggedInProps) {
  const isLoaded = useAuthStore((s) => s.isLoaded);
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);
  const userId = useAuthStore((s) => s.userId);

  const { push } = useRouter();

  if (!isLoaded) return loader || <Spinner />;

  if (!isLoggedIn) push("/auth/log-in");

  if (userId) {
    return children(userId as User["id"]);
  }

  return <div></div>;
}
