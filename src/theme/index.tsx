import {
  extendTheme,
  ThemeConfig,
  // theme as base
} from "@chakra-ui/react";
// @ts-ignore
import { mode, StyleFunctionProps } from "@chakra-ui/theme-tools";
import { Dict } from "@chakra-ui/utils";
// 2. Extend the theme to include custom colors, fonts, etc

const styles = {
  global: (props: any) => ({
    body: {
      color: "#000",
      bg: "#fff",
    },
  }),
};

const components = {
  Drawer: {
    // setup light/dark mode component defaults
    baseStyle: (props: Dict<any> | StyleFunctionProps) => ({
      dialog: {
        bg: mode("white", "#141214")(props),
      },
    }),
  },
};

// 2. Add your color mode config
const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  styles,
  components,
  colors: {
    root: {
      primary: "#232A44",
      primaryTint: "#646773",
      primaryDark: "#171C2D",
      secondary: "#FFD600",
      secondaryTint: "#FFF7CC",
      lightGrey: "#E8E8E8",
      lighterGrey: "#F3F3F3",
      success: "#06C167",
      successTint: "#06c1674d",
      successDark: "#024022",
      danger: "#FC7F79",
      dangerTint: "#ffe1de4d",
      dangerDark: "#DE1135",
      warning: "#FFD600",
      textMuted: "#868686",
      black: "#191919",
      white: "#FFFFFF",
    },
    buttonPrimary: {
      50: "#E5E5E7",
      // 100: "#edf2f7",
      // 200: "#e2e8f0",
      // 300: "#cbd5e0",
      // 400: "#a0aec0",
      500: "#232A44",
      600: "#171C2D",
      // 700: "#2d3748",
      // 800: "#1a202c",
      // 900: "#171923",
    },
    buttonLight: {
      50: "#F3F3F34d",
      500: "#F3F3F3",
      600: "#E8E8E8",
    },
    progressSecondary: {
      500: "#FFD600",
    },
  },
  fonts: {
    heading: `'Satoshi', sans-serif`,
    body: `'Satoshi', sans-serif`,
  },
});

export default theme;
