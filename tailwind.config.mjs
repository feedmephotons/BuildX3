import { fontFamily } from "tailwindcss/defaultTheme";

/**** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.mdx"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter var", ...fontFamily.sans]
      },
      colors: {
        shell: {
          border: "#e5e7eb",
          surface: "#f8fafc",
          muted: "#0f172a"
        },
        accent: {
          500: "#4f46e5",
          600: "#4338ca"
        }
      },
      boxShadow: {
        card: "0 12px 30px rgba(15, 23, 42, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
