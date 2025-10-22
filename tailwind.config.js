/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        'h1': '70px',
        'h2': '62px',
        'h3': '44px',
        'h4': '34px',
        'h5': '28px',
        'h6': '20px',
        'b18': '18px',
        'b16': '16px',
        'b14': '14px',
        'b12': '12px',
        'b10': '10px',

        'h1M': '35px',
        'h2M': '31px',
        'h3M': '26px',
        'h4M': '24px',
        'h6M': '20px',

        'h1T': '48px',

      },
      lineHeight: {
        'headingLH1': '100%',
        'headingLH2': '120%',
        'subHeadingLH2': '140%',
        'bodyLH': '160%',
        'bodyLH2': '170%',
      },
      colors: {
        'brand-primary': '#41210D',
        'brand-dark': '#211709',
        'brand-gray': '#7A746B',
        'brand-border-gray': '#E0DBD6',
        'brand-light-gray': '#9E9E9E',
        'brand-light-dark': '#908B84',
        'brand-black': '#191919',
        'brand-blue': '#085269',
        'brand-orange': '#F85825',
        'brand-dark-gray': '#5C5251',
        'regal-blue': '#EEEFF1',
        'input-bg': '#EFF0F3',
        'light-stroke': '#D1D4DD',
        'placeholder': '#C1BDBB',
        'brand-green': '#228B22',
        'brand-red': '#DC143C',
        'brand-yellow': '#FDCB2E',
        'brand-lighter-gray': '#E4E3DF',
        'brand-light-brown': '#F8F5EC',
        'brand-light-bg': '#EFF1F3',
      },
      boxShadow: {
        'nav-shadow': '0 4px 24px 0px rgba(25, 41, 84, 0.10)',
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to bottom, #CBCFE0, #BFBFBF, #BFBFBF)',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
  blocklist: ["table"],
}

