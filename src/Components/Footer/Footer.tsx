import { ButtonGroup, Box, IconButton, Stack, Text } from "@chakra-ui/react";
import * as React from "react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { useLocation } from "react-router-dom";
// import Logo from "../../Logo.svg";

export const Footer = () => {
  return (
    <Box
      as="footer"
      role="contentinfo"
      // py={{ base: "12", md: "16" }}
      px="6px"
      w="100%"
      mt="4rem"
      pos={window.location.pathname === "/" ? "relative" : "fixed"}
      bottom="0"
    >
      <Stack spacing={{ base: "4", md: "5" }}>
        <Stack justify="space-between" direction="row" align="center">
          <Text>Trillin</Text>
          <ButtonGroup variant="ghost">
            <IconButton
              as="a"
              href="#"
              aria-label="LinkedIn"
              icon={<FaLinkedin fontSize="1.25rem" />}
            />
            <IconButton
              as="a"
              href="#"
              aria-label="GitHub"
              icon={<FaGithub fontSize="1.25rem" />}
            />
            <IconButton
              as="a"
              href="#"
              aria-label="Twitter"
              icon={<FaTwitter fontSize="1.25rem" />}
            />
          </ButtonGroup>
        </Stack>
        <Text fontSize="sm" color="subtle">
          &copy; {new Date().getFullYear()} Chakra UI Pro, Inc. All rights
          reserved.
        </Text>
      </Stack>
      <Box
        className="footer-gradient"
        h="10px"
        bgGradient={"linear-gradient(to right, red, purple)"}
      />
    </Box>
  );
};
