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

import { Movie } from "../../Components/Movie/Movie";

export const Home = () => {
  return (
    <Container
      maxW={{ base: "100ch", md: "", lg: "200ch", xl: "1000ch" }}
      mt="1.5rem"
    >
      <Flex
        className="movie-main"
        flexWrap={"wrap"}
        justifyContent="center"
        alignItems={"center"}
        // bg="blue"
        // mt="1rem"
        p="1"
        // flexDir='row'
        // maxW="100%"

        gap="1rem"
        // py={[0, 10, 20]}
        // direction={{ base: "column-reverse", md: "row" }}
        // bg={["skyblue", "blue", "yellow"]}
      >
        <Movie />
        <Movie />
        <Movie />
        <Movie />
        <Movie />
        <Movie />
        <Movie />
        <Movie />
        <Movie />
        <Movie />
        <Movie />
        <Movie />
        <Movie />
        <Movie />
        <Movie />
        <Movie />
      </Flex>
    </Container>
  );
};
