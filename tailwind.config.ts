import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        background: "#202022",
        foreground: "#303034",
        foregroundLigher: "#5C5C63",
        primary: {
          0: "#202022",
          100: "#303034",
          200: "#3E3E43",
          300: "#7A7A88",
        },
        border: "#5C5C63",
        text: {
          light: "#F9F9FF",
          grayed: "#5C5C63",
        },
        accent: "3A47D8",
      },
    },
  },
  plugins: [],
};
export default config;
