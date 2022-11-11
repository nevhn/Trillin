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
    // <Container className="main-movie" maxW="container.xl" p={0}>
    <Flex
    className="movie-main"
      flexWrap={"wrap"}
      justifyContent='center'
      align-items='center'
      // bg= 'blue'
      mt='1rem'
      p ='1'
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
    // </Container>
  );
};
