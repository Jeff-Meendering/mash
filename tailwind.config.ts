import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        mono: ["var(--font-mono)", ...fontFamily.mono]
      },
    },
  },
  plugins: [],
} satisfies Config;
