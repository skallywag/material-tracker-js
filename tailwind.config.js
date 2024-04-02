/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      primaryOrange: "#E36414",
      primaryGray: "#333",
      primaryBlue: "#1C7ED6",
      lightGray: "#d3d3d3",
      accentError: "#B31312",
      white: "#ffff",
    },
    extend: {
      boxShadow: {
        customShadow: "-16px 14px 70px -12px rgba(47,172,189,1);",
      },
      fontFamily: {
        workbench: ["workbench"],
      },
    },
  },
  plugins: [],
};
