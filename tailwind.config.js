/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {},
  },
  plugins: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}'],
};

// /** @type {import('tailwindcss').Config} */

// const tailwindConfig = {
//   content: ['./src/pages/**/*.{js,ts,jsx,tsx,mdx}', './src/components/**/*.{js,ts,jsx,tsx,mdx}'],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };

// export default tailwindConfig;
