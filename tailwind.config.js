/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        anton: ["Anton", "sans-serif"],
        lora: ["Lora", "sans-serif"],
        urbanist: ["Urbanist", "sans-serif"],
        clash: [" ClashDisplay-Regular", "sans-serif"],
        clashmd: [" ClashDisplay-Medium", "sans-serif"],
        clashsm: [" ClashDisplay-Semibold", "sans-serif"],
        clashreg: [" ClashDisplay-Regular", "sans-serif"],
        clashbold: [" ClashDisplay-Bold", "sans-serif"],
      },
      colors: {
        primary: "#ED2224",
        sec: "#0D292A",
        tertiary: "#354C4D",
        blak: "#1D2739",
        border: "#E4E7EC",
        screen: "#F9FAFB",
        c7: "#C70E10",
      },
    },
  },
  plugins: [],
};
