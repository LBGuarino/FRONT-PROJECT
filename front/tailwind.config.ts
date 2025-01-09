import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        footerBg: '#f1f3f8',
        footerText: '#5f4b52',
        footerHover: '#1d1a1b',
      },
    },
  },
  plugins: [],
} satisfies Config;
