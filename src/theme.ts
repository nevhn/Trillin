import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "#201C1C",
        color: "white",
        option: {
          color: "black",
        },
        // backgroundColor: "#201C1C",
        // color: "white",
      },
    },
  },
});

export default theme;
