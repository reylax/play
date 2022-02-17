const plugin = require('tailwindcss/plugin')
const scrollbarHide = plugin(function ({ addUtilities }) {
  addUtilities({
    '.scrollbar-hide': {
      /* Firefox */
      'scrollbar-width': 'none',

      /* Safari and Chrome */
      '&::-webkit-scrollbar': {
        display: 'none'
      }
    }
  })
})

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './containers/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    fontFamily: {
      display: ['Menlo', 'monospace'],
      body: ['Poppins', 'system-ui', 'sans-serif'],
    },
    extend: {
      colors: {
        logo: "#FFC107",
        primary: {
          50: "var(--primary_50)",
          100: "var(--primary_100)",
          200: "var(--primary_200)",
          300: "var(--primary_300)",
          400: "var(--primary_400)",
          500: "var(--primary_500)",
          600: "var(--primary_600)",
          700: "var(--primary_700)",
        },
        // text
        c: {
          body: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          disabled: "var(--text-disabled)",
          hint: "var(--text-hint)",
        },
        bg: {
          default: "var(--background-defalut)",
          paper: "var(--background-paper)",
          active: "var(--background-active)"
        },
        // border
        d: {
          div: "var(--border-color)",
          transparent: "var(--background-defalut)"
        },
        paper: {
          100: "#FBF8F1"
        },
        mask: {
          100: "rgba(91, 112, 131, 0.4)"
        }
      },
      spacing: {
        "7.5": "31px",
        3: "3px",
        18: "70px",
        "100": "380px",
        585: "585px",
        200: "200px",
        _50: "-50px",
        _80: "-80px",
        _20: "-20px",
      },
      animation: {
        sent: 'sent 4s linear',
        receive: 'receive 4.5s linear',
        connecting: 'conncting 4s linear infinite',
        matched: 'matched 1s linear'
      },
      keyframes: {
        sent: {
          '0%': {
            transform: 'scale(0.5)',
            visibility: "visible"
          },
          '10%': {
            transform: 'translateY(-50px)'
          },
          '20%': {
            transform: 'translateY(-50px) scale(2)'
          },
          '35%': {
            transform: 'scale(2) translateY(-200px) rotateZ(160deg)'
          },
          "75%": {
            transform: 'translateY(-200px) scale(1.5)'
          },
          '100%': {
            transform: 'scale(2) rotateZ(360deg) translateY(-190px) translateX(220px)'
          }
        },
        receive: {
          '0%': {
            transform: 'scale(0.5)',
            visibility: "visible"
          },
          '40%': {
            transform: 'scale(3)'
          },
          '55%': {
            transform: 'scale(2) translateX(-80px)'
          },
          "75%": {
            transform: 'scale(3) translateX(-80px) rotateZ(360deg)'
          },
          "80%": {
            transform: 'scale(3) translateX(-80px) rotateZ(-360deg)'
          },
          '100%': {
            transform: 'scale(2.5) translateY(180px)'
          }
        },
        matched: {
          '50%': {
            transform: "translateX(-100px)"
          }
        },
        conncting: {
          '0%': {
            transform: 'scale(1)',
            backgroundColor: "#FFBBBB",
          },
          '50%': {
            transform: 'scale(1.3) translateX(50px)',
            backgroundColor: "#FF5C8D",
          },
          '51%': {
            transform: 'scale(1) translateX(50px)',
            backgroundColor: "#90E0EF",
          },
          '100%': {
            transform: 'scale(1.3)',
            backgroundColor: "#00B4D8",
          }
        },
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [scrollbarHide],
}


