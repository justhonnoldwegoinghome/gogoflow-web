import { useEffect } from "react";
import { useRouter } from "next/router";

import { useAuthStore } from "../stores/useAuthStore";
import { refreshAccessToken } from "../api/refreshAccessToken";

export function useLoad() {
  const logIn = useAuthStore((s) => s.logIn);
  const load = useAuthStore((s) => s.load);

  const push = useRouter().push;

  useEffect(() => {
    refreshAccessToken()
      .then((res) => {
        logIn(res.data);
        load();
      })
      .then(() => push("/me"))
      .catch(() => {
        load();
      });
  }, []);

  return;
}
