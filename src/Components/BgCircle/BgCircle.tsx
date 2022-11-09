import { Box } from "@chakra-ui/react";
export const BgCircle = () => {
  return (
    <Box
      className="bg-grad"
      pos="absolute"
      top="-500"
      left="-100"
      right="auto"
      bottom="auto"
      zIndex={3}
    >
      <Box
        className="big-circle"
        pos="absolute"
        w="600px"
        h="600px"
        bg={"#2891FC"}
        borderRadius="full"
        filter={"blur(100px)"}
        opacity="45%"
      />
    </Box>
  );
};
