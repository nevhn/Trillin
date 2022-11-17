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
import { useEffect, useState } from "react";
import { Movie } from "../../Components/Movie/Movie";
import axios from "axios";

export const Home = () => {
  const [movie, setMovie] = useState({});

  const fetchMovie = async () => {
    const response = await axios(
      "https://api.themoviedb.org/3/movie/upcoming?api_key=13f9b567969342bbfb2322ca39624376&language=en-US&page=1"
    );
    setMovie(response.data);
  };

  useEffect(() => {
    fetchMovie();
    console.log(movie);
  }, []);

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
