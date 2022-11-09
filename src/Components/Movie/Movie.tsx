import {
  Box,
  Grid,
  GridItem,
  SimpleGrid,
  Center,
  Container,
  Flex,
  Spacer,
  Img,
  Heading,
  Text,
  Fade,
  useDisclosure,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";

export const Movie = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onToggle } = useDisclosure();

  const bgOverview = useColorModeValue("#201C1C", "black");
  const textOverview = useColorModeValue("white", "white");

  return (
    <Box
      className="movie"
      bg="red"
      overflow={"hidden"}
      pos={"relative"}
      w={"300px"}
      // mt="0.5rem"
      // mx="0.3rem"
      onMouseEnter={onToggle}
      onMouseLeave={onToggle}
    >
      <Img
        w={"100%"}
        src="https://m.media-amazon.com/images/M/MV5BODZkZjUxNmEtMGEyOS00ZDY5LTkxZDMtZTJkZDBiZTkyOWRkXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg"
      />
      <Flex
        className="move-data"
        alignItems={"center"}
        justifyContent={"space-between"}
        padding="0.5rem 1rem 1rem"
        letterSpacing="0.5px"
        bg={"eee"}
      >
        <Heading as="h3" m="0" size="lg">
          Neon Genesis Evangelion
        </Heading>
        <Text
          as="span"
          color="#2891FC"
          fontWeight="bold"
          padding="0.25rem 0.5rem"
        >
          8.5
        </Text>
        <Fade in={isOpen}>
          <Box
            className="overview"
            bg={bgOverview}
            pos="absolute"
            p="2rem"
            overflow="auto"
            maxHeight="100%"
            left="0"
            bottom="0"
            right="0"
          >
            <Heading as="h3" mt="0" size="lg" color={textOverview}>
              Overview
            </Heading>
            <Text color={textOverview}>
              A teenage boy finds himself recruited as a member of an elite team
              of pilots by his father.
            </Text>
          </Box>
        </Fade>
      </Flex>
    </Box>
  );
};
