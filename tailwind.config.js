/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}", // if outside src
  ],
  theme: {
    extend: {
      //   borderRadius: {
      //     lg: "var(--radius)",
      //     md: "calc(var(--radius) - 2px)",
      //     sm: "calc(var(--radius) - 4px)",
      //   },
      flex: {
        full: "0 0 100%",
      },
      margin: {
        15: "3.75rem",
      },
      padding: {
        15: "3.75rem",
      },
      gap: {
        15: "3.75rem",
      },
      width: {
        15: "3.75rem",
      },
      height: {
        15: "3.75rem",
      },
      screens: {
        xs: "380px",
      },
      fontSize: {
        xxs: "0.665rem", // 10.64px
        "2xml": "1.75rem", // 28px
        "3xml": "2rem", // 32px
        "6xml": "4rem", // 64px
        "7xml": "5rem", // 80px
      },
      colors: {
        transparent: "transparent",
        natural: {
          50: "#FAFAFA",
          100: "#F5F5F5",
          150: "#F6F6F6",
          200: "#EEEEEE",
          220: "#E3E3E3",
          250: "#E6E5E5",
          300: "#E0E0E0",
          400: "#BDBDBD",
          450: "#CACACA",
          500: "#9E9E9E",
          700: "#616161",
          800: "#424242",
          950: "#0A0A0A",
        },
        main: {
          50: "#E9FFFA",
          100: "#CCFFF0",
          200: "#99FFE0",
          300: "#5CFFD0",
          400: "#2AF2B6",
          500: "#00D6A0",
          600: "#00B388",
          700: "#00C896",
          800: "#008F6A",
          900: "#006B4F",
          950: "#006752",
        },

        text: {
          400: "#BDBDBD",
          500: "#9E9E9E",
          700: "#4F4F4F",
          900: "#191919",
          950: "#0A0A0A",
        },
        white: {
          DEFAULT: "#FFFFFF",
          100: "#E5F2FF",
          200: "#F9F9F9",
          300: "#A9A9A9",
        },
        violet: {
          DEFAULT: "#772ADB",
        },
        gray: {
          100: "#404041",
          200: "#B8B8B8",
          300: "#919191",
          400: "#CACACA",
          600: "#888888",
          700: "#4F4F4F",
          800: "#8A8A8A",
          900: "#858585",
        },
        blue: {
          DEFAULT: "#266DE8",
          100: "#2D8EFF",
          200: "#182853",
          300: "#7994B6",
          400: "#0A3161",
          500: "#012169",
          900: "#1A47B8",
        },
        red: {
          DEFAULT: "#F93939",
          50: "#FEE",
          100: "#FF4646",
          200: "#FF5858",
          300: "#C8102E",
          400: "#B31942",
          500: "#FF1D1D",
        },
        yellow: {
          100: "#FF9D00",
          200: "#FFDA2C",
          300: "#FECA57",
          400: "#FFF1D2",
        },
        black: {
          DEFAULT: "#000000",
          100: "#000008",
          200: "#131313",
          300: "#1D1D1D",
          400: "#191919",
          500: "#181A20",
          600: "#888888",
        },
        green: {
          DEFAULT: "#008846",
          100: "#618483",
          200: "#729897",
          300: "#D3FFEA",
          400: "#00AE5B",
        },

        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
      },
      fontFamily: {
        inter: ["inter", "sans-serif"],
        hindSiliguri: ["hindSiliguri", "sans-serif"],
        barlowCondensed: ["barlowCondensed", "sans-serif"],
      },
      backgroundImage: {
        mainGradient: "linear-gradient(90deg, #2A6AE8 4.19%, #772ADB 58.84%)",
        loginHoverGradient:
          "linear-gradient(90deg, #1f53b7 4.19%, #5d20a7 58.84%)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
