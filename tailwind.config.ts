import type { Config } from "tailwindcss";
import { nextui } from "@nextui-org/react";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        main: {
          "50": "#fdf3f4",
          "100": "#fae9e9",
          "200": "#f6d5d7",
          "300": "#eeb3b7",
          "400": "#e48891",
          "500": "#d86674",
          "600": "#c03e54",
          "700": "#a12f45",
          "800": "#872a3f",
          "900": "#74273b",
          "950": "#40111c",
        },
      },
    },
  },

  plugins: [
    nextui({
      themes: {
        light: {
          layout: {}, // light theme layout tokens
          colors: {
            background: "#fae9e9",
            foreground: "#40111c",
            secondary: {
              DEFAULT: "#d86674",
              foreground: "#fae9e9",
            },
          },
        },
        dark: {
          layout: {}, // dark theme layout tokens
          colors: {
            background: "#40111c",
            foreground: "#fae9e9",
            secondary: {
              DEFAULT: "#d86674",
              foreground: "#40111c",
            },
            focus: "#d86674",
          },
        },
        custom: {
          extend: "dark", // <- inherit default values from dark theme
          colors: {
            background: "#0D001A",
            foreground: "#ffffff",
            primary: {
              50: "#fef2f2",
              100: "#fee2e2",
              200: "#fecaca",
              300: "#fca5a5",
              400: "#f87171",
              500: "#ef4444",
              600: "#dc2626",
              700: "#b91c1c",
              800: "#991b1b",
              900: "#7f1d1d",
              DEFAULT: "#f87171",
              foreground: "#a21caf",
            },
            focus: "#701a75",
          },
        },
      },
    }),
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require("tailwindcss-animate"),
  ],
};
export default config;
