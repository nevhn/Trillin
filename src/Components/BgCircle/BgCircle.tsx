import { Box } from "@chakra-ui/react";
export const BgCircle = () => {
  return (
    <Box
      className="bg-grad"
      pos="absolute"
      zIndex={3}
      pointerEvents="none"
      // w={{ base: "100%", md: "50%" }}
    >
      <Box
        className="big-circle"
        pos="absolute"
        w="600px"
        h="600px"
        top="-536px"
        left="-300px"
        right="auto"
        bottom="auto"
        bg={"#2891FC"}
        borderRadius="full"
        filter={"blur(100px)"}
        opacity="30%"
        pointerEvents="none"
      />
    </Box>
  );
};
