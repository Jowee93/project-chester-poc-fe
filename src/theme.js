// src/theme.js
import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "dark", // or 'light'
  useSystemColorMode: false,
};

const theme = extendTheme({ config });
export default theme;
