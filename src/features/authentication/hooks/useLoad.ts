import { useEffect } from "react";

import { useAuthStore } from "../stores/useAuthStore";
import { refreshAccessToken } from "../api/refreshAccessToken";

export function useLoad() {
  const logIn = useAuthStore((s) => s.logIn);
  const load = useAuthStore((s) => s.load);

  useEffect(() => {
    refreshAccessToken()
      .then((res) => {
        logIn(res.data);
        load();
      })
      .catch(() => {
        load();
      });
  }, []);

  return;
}
