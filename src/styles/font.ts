import localFont from "next/font/local";

export const font = localFont({
  src: [
    {
      path: "../../public/fonts/CabinetGrotesk-Thin.woff2",
      weight: "100",
    },
    {
      path: "../../public/fonts/CabinetGrotesk-Extralight.woff2",
      weight: "200",
    },
    {
      path: "../../public/fonts/CabinetGrotesk-Light.woff2",
      weight: "300",
    },
    {
      path: "../../public/fonts/CabinetGrotesk-Regular.woff2",
      weight: "400",
    },
    {
      path: "../../public/fonts/CabinetGrotesk-Medium.woff2",
      weight: "500",
    },
    {
      path: "../../public/fonts/CabinetGrotesk-Bold.woff2",
      weight: "600",
    },
    {
      path: "../../public/fonts/CabinetGrotesk-Extrabold.woff2",
      weight: "700",
    },
    {
      path: "../../public/fonts/CabinetGrotesk-Black.woff2",
      weight: "800",
    },
  ],
  display: "swap",
});
