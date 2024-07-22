import clsx from "clsx";
import { SWRConfig, SWRConfiguration } from "swr";
import { Open_Sans } from "next/font/google";
import type { AppProps } from "next/app";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/react";

import "@/styles/globals.css";
import { APIError } from "@/apiClient";
import { Toaster, useToast } from "@/components/toaster";
import { Button } from "@/components/button";
import { LoggedIn, useLoad } from "@/features/authentication";
import { UserDropdownMenu } from "@/features/users";

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
    },
  };

  return (
    <SWRConfig value={swrConfig}>
      <div className={clsx(openSans.className, "min-h-screen flex flex-col")}>
        {/* Nav bar */}
        <div className="bg-white">
          <div className="flex justify-between items-center max-w-screen-laptop mx-auto h-24 bg-white px-[3vw]">
            <Button asChild>
              <Link
                href="/"
                className="w-10 h-10 rounded-md bg-gradient-to-r from-teal-500 to-indigo-500"
              ></Link>
            </Button>
            <LoggedIn
              loader={
                <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse" />
              }
              fallback={
                <div className="flex gap-2">
                  <Button asChild>
                    <Link href="/auth/request-sign-up">Sign up</Link>
                  </Button>
                  <Button asChild variant="ghost">
                    <Link href="/auth/log-in">Log in</Link>
                  </Button>
                </div>
              }
            >
              {(userId) => <UserDropdownMenu id={userId} />}
            </LoggedIn>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 bg-white">
          <div className="max-w-screen-laptop mx-auto px-[3vw] pt-8 pb-24">
            <Component {...pageProps} />
          </div>
        </main>
        <Toaster />
        <Analytics mode="production" />
      </div>
    </SWRConfig>
  );
}
