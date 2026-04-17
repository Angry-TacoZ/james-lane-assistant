/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "surface-variant": "#333537",
        "on-tertiary": "#2e3130",
        "primary-container": "#84a16f",
        "surface-container-lowest": "#0c0e10",
        "on-secondary": "#2d312f",
        "secondary-fixed": "#e0e3df",
        "on-surface-variant": "#c4c8bb",
        "primary-fixed-dim": "#b1d09a",
        "on-error": "#690005",
        "secondary-fixed-dim": "#c4c7c3",
        "surface-tint": "#b1d09a",
        background: "#121415",
        "error-container": "#93000a",
        "tertiary-fixed": "#e1e3e1",
        "on-primary-fixed": "#0a2100",
        "surface-bright": "#37393b",
        "on-primary": "#1e3610",
        "inverse-surface": "#e2e2e5",
        "surface-container-high": "#282a2c",
        outline: "#8e9287",
        "on-primary-fixed-variant": "#344d24",
        error: "#ffb4ab",
        "on-tertiary-fixed": "#191c1b",
        "surface-container-low": "#1a1c1e",
        surface: "#121415",
        primary: "#b1d09a",
        "on-tertiary-container": "#2e3130",
        "primary-fixed": "#cdecb4",
        secondary: "#c4c7c3",
        "inverse-on-surface": "#2f3133",
        "tertiary-container": "#969997",
        "on-secondary-fixed-variant": "#444845",
        "outline-variant": "#44483e",
        "on-tertiary-fixed-variant": "#444746",
        "surface-container-highest": "#333537",
        "on-secondary-container": "#b3b6b2",
        "on-error-container": "#ffdad6",
        "inverse-primary": "#4b663a",
        "surface-dim": "#121415",
        "tertiary-fixed-dim": "#c5c7c5",
        "on-background": "#e2e2e5",
        tertiary: "#c5c7c5",
        "on-primary-container": "#1f3710",
        "surface-container": "#1e2022",
        "on-secondary-fixed": "#191c1a",
        "on-surface": "#e2e2e5",
        "secondary-container": "#444845"
      },
      fontFamily: {
        headline: ["Inter", "sans-serif"],
        body: ["Inter", "sans-serif"],
        label: ["Space Grotesk", "sans-serif"]
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px"
      }
    }
  }
};
