module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      bmjua: ['bmjua'],
    },
    extend: {
      colors: {
        highRight: '#FF9900',
        bithumb: '#F6B93B',
        bithumbGray: '#777777',
        bithumbYellow: '#FAD390',
        nightBlack: '#353232',
        upRed: '#E55039',
        downBlue: '#6A89CC',
        bithumbSubGray: '#D0D0D0',
        downBox: '#1E3799',
        upBox: '#EB2F06',
      },
      dropShadow: {
        '3xl': '0px 5px 3px rgba(0, 0, 0, 0.85)',
      },

      animation: {
        up: 'up_Effect 0.2s',
        down: 'down_Effect 0.2s',
        effect: 'effet 0.2s forward',
      },

      keyfraems: {
        effect: {
          from: {},
          to: {
            opacity: 0,
            transform: 'scale(0)',
          },
        },
        up_Effect: {
          from: {
            opacity: 1,
            borderColor: 'red',
          },
          to: {
            opacity: 0,
            borderColor: 'white',
          },
        },
        down_Effect: {
          '0%': {
            opacity: 1,
            borderColor: 'blue',
          },
          '100%': {
            opacity: 0,
            borderColor: 'white',
          },
        },
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
