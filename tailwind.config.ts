import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#090A0C",
        surface: {
          1: "#111317",
          2: "#1B1E24",
          3: "#262A32",
        },
        border: {
          subtle: "#1F232B",
          focus: "#333A48",
        },
        accent: {
          emerald: "#10B981",
          amber: "#F59E0B",
          rose: "#F43F5E",
        },
        text: {
          primary: "#F8FAFC",
          muted: "#94A3B8",
          dim: "#64748B",
        },
      },
    },
  },
  plugins: [],
};

export default config;
