import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        mobile: "375px",
        tablet: "768px",
        laptop: "1200px",
        desktop: "1920px",
      },
      colors: {
        primary: "#000000",
        "primary-foreground": "#ffffff",
        destructive: "#ffffff",
        "destructive-foreground": "#ef4444",
      },
    },
  },
  plugins: [],
};
export default config;
