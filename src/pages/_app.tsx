import "@/styles/globals.css";
import { SWRConfig, SWRConfiguration } from "swr";
import type { AppProps } from "next/app";

import { APIError } from "@/apiClient";
import { Navbar } from "@/features/app";
import { useAuthStore, useLoad, useLogOut } from "@/features/authentication";

export default function App({ Component, pageProps }: AppProps) {
  const isLoaded = useAuthStore((s) => s.isLoaded);
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);

  const logOutMutation = useLogOut();

  useLoad();

  const swrConfig: SWRConfiguration = {
    dedupingInterval: 500,
    onError: (e: APIError) => {
      console.log(e.response?.data.errors);
    },
  };

  return (
    <SWRConfig value={swrConfig}>
      <div>
        <Navbar
          isLoaded={isLoaded}
          isLoggedIn={isLoggedIn}
          logOut={logOutMutation.trigger}
        />
        <Component {...pageProps} />
      </div>
    </SWRConfig>
  );
}
