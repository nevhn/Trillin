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
} from "@chakra-ui/react";

export const Home = () => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Flex flexWrap={"wrap"} bg={"rebeccapurple"}>
      <Box
        className="movie"
        bg="red"
        w={"300px"}
        overflow={"hidden"}
        pos={"relative"}
        onMouseEnter={onToggle}
        onMouseLeave={onToggle}
      >
        <Img
          w={"100%"}
          src="https://m.media-amazon.com/images/M/MV5BODZkZjUxNmEtMGEyOS00ZDY5LTkxZDMtZTJkZDBiZTkyOWRkXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg"
        />
        <Flex
          bg={"blue.200"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Heading as="h3" m="0" size="lg">
            Neon Genesis Evangelion
          </Heading>
          <Text as="span" color="darkred" fontWeight="bold">
            8.5
          </Text>
          <Fade in={isOpen}>
            <Box
              className="overview"
              bg={"pink"}
              pos="absolute"
              maxHeight="100%"
              left="0"
              bottom="0"
              right="0"
              overflow="auto"
            >
              <Heading as="h3" m="0" size="lg">
                Overview
              </Heading>
              A teenage boy finds himself recruited as a member of an elite team
              of pilots by his father.
            </Box>
          </Fade>
        </Flex>
      </Box>
    </Flex>
  );
};
