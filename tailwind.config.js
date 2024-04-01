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
      lightGray: "#d3d3d3",
      accentError: "#B31312",
      white: "#ffff"
    },
    extend: {
      fontFamily: {
        // 'custom': ['workbench', 'sans-serif'],
        workbench: ["workbench"]
      },
    },
  },
  plugins: [],
}

