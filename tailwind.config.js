const { guessProductionMode } = require('@ngneat/tailwind');
const { colors } = require('tailwindcss/defaultTheme');

module.exports = {
  prefix: '',
  purge: {
    enabled: guessProductionMode(),
    content: ['./src/**/*.{html,ts}'],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      primary: ['Roboto'],
      secondary: ['Open Sans'],
    },
    borderRadius: {
      none: '0',
      tiny: '5px',
      sm: '8px',
      DEFAULT: '12px',
      md: '14px',
      lg: '24px',
      full: '9999px',
    },
    minWidth: {
      0: '0',
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
      full: '100%',
    },
    fontSize: {
      tiny: '8px',
      xs: '12px',
      sm: '14px',
      base: '15px',
      lg: '16px',
      xl: '35px',
      '2xl': '45px',
      '3xl': '75px',
    },
    colors: {
      transparent: 'transparent',
      blue: {
        darkest: '#002143',
        dark: '#003265',
        DEFAULT: '#004286',
        light: '#4071a4',
        lightest: '#80a1c3',
      },
      green: {
        darkest: '#005429',
        dark: '#007e3d',
        DEFAULT: '#00a851',
        light: '#40be7d',
        lightest: '#80d4a8',
      },
      gold: {
        darkest: '#78693a',
        dark: '#b39d56',
        DEFAULT: '#efd173',
        light: '#f3dd96',
        lightest: '#f7e8b9',
      },
      silver: {
        darkest: '#63605d',
        dark: '#94908b',
        DEFAULT: '#c5c0b9',
        light: '#d4d0cb',
        lightest: '#e2e0dc',
      },
      red: {
        light: '#ee4958',
        DEFAULT: '#e80c20',
      },
      grey: {
        500: '#3c3d44',
      },
      white: colors.white,
      black: colors.black,
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
