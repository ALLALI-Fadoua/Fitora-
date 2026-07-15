/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        cairo: ["Cairo", "sans-serif"],
      },
      colors: {
        ink: {
          950: "#08090a",
          900: "#0d0f10",
          800: "#141718",
          700: "#1c2021",
          600: "#282e2f",
        },
        brand: {
          400: "#34d399", // emerald-400
          500: "#0d9488", // teal-500 area
        },
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #34d399 0%, #14b8a6 100%)",
        "brand-gradient-soft": "linear-gradient(135deg, rgba(52,211,153,0.15) 0%, rgba(20,184,166,0.15) 100%)",
      },
      boxShadow: {
        brand: "0 10px 30px -10px rgba(20, 184, 166, 0.35)",
      },
    },
  },
  plugins: [],
};
