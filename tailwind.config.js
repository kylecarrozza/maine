const plugin = require("tailwindcss/plugin");

module.exports = {
  mode: 'jit',
  purge: {
    enabled: true,
    content: [
      './*.html',
      './*/*.html',
      './*/*/*.html',
      './assets/js/*.js'
    ]
  },
  theme: {
    extend: {
      screens: {
        's-1': '1320px',
        's-2': '1440px'
      },
      fontFamily: {
        '1': ['Aileron', 'sans-serif'],
        '2': ['Gilroy', 'sans-serif']
      },
      backgroundImage: {
        '1': 'linear-gradient(180deg, #FE4F31 0%, #DF2770 100%)',
        '2': 'linear-gradient(247.8deg, #0CA3BD 0%, #687AD0 100%)',
        'img-1': 'url(../img/concrete.png)'
      },
      fontSize: {
        '1': '2.5rem'
      },
      width: {
        'w-1': '60vw'
      },
      colors: {
        blue: {
          '1': '#0676DE'
        },
        gray: {
          '1': '#171717',
        },
        purple: {
          '1': '#6B6BFE'
        }
      }
    }
  }
}