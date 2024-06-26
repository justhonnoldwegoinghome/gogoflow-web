import clsx from "clsx";
import { SWRConfig, SWRConfiguration } from "swr";
import { Open_Sans } from "next/font/google";
import type { AppProps } from "next/app";
import Link from "next/link";

import "@/styles/globals.css";
import { APIError } from "@/apiClient";
import { LoggedIn, useLoad } from "@/features/authentication";
import { UserMenu } from "@/features/users";
import { Toaster, useToast } from "@/components/ui/toaster";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export default function App({ Component, pageProps }: AppProps) {
  useLoad();

  const { toast } = useToast();

  const swrConfig: SWRConfiguration = {
    dedupingInterval: 500,
    shouldRetryOnError: false,
    onError: (e: APIError) => {
      if (e.response) {
        e.response.data.errors.forEach((e) =>
          toast({
            variant: "destructive",
            title: e.title,
            description: e.detail || "",
          })
        );
      }
      // console.log(e.response?.data.errors);
    },
  };

  return (
    <SWRConfig value={swrConfig}>
      <div className={clsx(openSans.className, "min-h-screen flex flex-col")}>
        {/* Nav bar */}
        <div className="bg-white">
          <div className="flex justify-between items-center max-w-screen-laptop mx-auto h-24 bg-white px-[2vw]">
            <Link
              href="/"
              className="w-10 h-10 rounded-md bg-gradient-to-r from-pink-500 to-indigo-500"
            ></Link>
            <LoggedIn
              fallback={
                <div className="flex gap-2">
                  <Link
                    href="/auth/request-sign-up"
                    className="block rounded p-3 bg-gray-100"
                  >
                    Sign Up
                  </Link>
                  <Link href="/auth/log-in" className="block rounded p-3">
                    Log In
                  </Link>
                </div>
              }
            >
              {(userId) => <UserMenu id={userId} />}
            </LoggedIn>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 bg-white">
          <div className="max-w-screen-laptop mx-auto px-[2vw] pt-8 pb-24">
            <Component {...pageProps} />
          </div>
        </main>
        <Toaster />
      </div>
    </SWRConfig>
  );
}
