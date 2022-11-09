import { mode } from "@chakra-ui/theme-tools";
import { extendTheme } from "@chakra-ui/react";

const styles = {
  global: (props: any) => ({
    body: {
      color: mode("gray.800", "whiteAlpha.900")(props),
      bg: mode("gray.100", "#201C1C")(props),
    },
  }),
};

// const components = {
//   Drawer: {
//     // setup light/dark mode component defaults
//     baseStyle: (props: any) => ({
//       dialog: {
//         bg: mode("red", "#141214")(props),
//       },
//     }),
//   },
// };

const theme = extendTheme({
  // components,
  styles,
});

export default theme;
