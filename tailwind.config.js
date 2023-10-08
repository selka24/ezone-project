const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    // extend: {
    //   fontFamily: {
    //     sans: ["Inter var", ...defaultTheme.fontFamily.sans],
    //   },
    // },
  },
  plugins: [
    // require('@tailwindcss/typography'),
    require("daisyui"),
    // require("@tailwindcss/forms")
  ],
  daisyui: {
    themes: ['light', 'valentine']
  }
};
