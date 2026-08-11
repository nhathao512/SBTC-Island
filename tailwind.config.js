/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#050505",
        surface: "#0A0A0A",
        raised: "#151515",
        border: "#1E1E1E",
        text: "#F5F5F5",
        muted: "#A3A3A3",
        accent: "#C8742A",
        "accent-light": "#E8922A",
        online: "#4ADE80",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      letterSpacing: {
        widest2: "0.25em",
        widest3: "0.35em",
      },
    },
  },
  plugins: [],
};
