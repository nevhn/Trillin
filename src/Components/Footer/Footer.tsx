import { Box, IconButton, Text } from "@chakra-ui/react";
import * as React from "react";
import { FaGithub } from "react-icons/fa";

export const Footer = () => {
  // console.log("useLocation", window.location.pathname);
  return (
    <Box
      width="100%"
      height="40px"
      display="flex"
      position={"fixed"}
      bottom={0}
      alignItems="center"
      justifyContent="center"
      bg="linear-gradient(to right, red, purple)"
      color="white"
    >
      <Text fontSize={14}>
        &copy; {new Date().getFullYear()} Nevhn
        <IconButton
          as="a"
          href="https://github.com/nevhn"
          aria-label="GitHub"
          background={"transparent"}
          icon={<FaGithub fontSize="1.25rem" />}
          target="_blank"
          _hover={{
            background: "transparent",
          }}
        />
      </Text>
    </Box>
  );
};
