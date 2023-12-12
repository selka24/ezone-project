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
    //     sans: ["Adogare", ...defaultTheme.fontFamily.sans],
    //   },
    // },
  },
  plugins: [
    // require('@tailwindcss/typography'),
    require("daisyui"),
    // require("@tailwindcss/forms")
  ],
  daisyui: {
    themes: [{
      ezon: {
        "primary": "#fe5d0d",
        "secondary": "#474747",
        "accent": "#cecece",
        "neutral": "#f4f4f4",
        "base-100": "#f7f7f7",
      },
    },'light', 'valentine']
  }
};
