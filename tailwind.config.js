// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        colors: {
          primary: {
            light: '#4fd153',
            DEFAULT: '#29c92b',
            dark: '#1f8764',
          },
          secondary: {
            DEFAULT: '#9c2c2c',
          },
          background: {
            DEFAULT: '#128a5c',
          }
        },
      },
    },
    plugins: [],
  };