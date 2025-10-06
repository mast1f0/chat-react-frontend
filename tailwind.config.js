module.exports = {
  corePlugins: {
    preflight: false,
  },
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'custom-purple': '#403752',
        // Or use a more descriptive name
        'deep-purple': '#403752',
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
  
}
