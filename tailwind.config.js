/** @type {import('tailwindcss').Config} */
const { nextui } = require('@nextui-org/react');

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [require('daisyui'), nextui()],
  daisyui: {
    themes: [
       {
          mytheme: {
             primary: '#0052D5',
             'primary-content': '#ffffff',
             'primary-focus': '#a85c26',
             secondary: '#092C4C',
             'secondary-content': '#ffffff',
             'secondary-focus': '#092C4C',
          },
       },
    ],
  },
};
