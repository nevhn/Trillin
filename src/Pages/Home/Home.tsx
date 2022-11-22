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
import { useState, useEffect } from "react";
import axios from "axios";
import { Movie } from "../../Components/Movie/Movie";

export const Home = () => {
  const [movies, setMovie] = useState<any[]>([]);

  const fetchMovie = async () => {
    const response = await axios(
      "https://api.themoviedb.org/3/movie/upcoming?api_key=13f9b567969342bbfb2322ca39624376&language=en-US&page=1"
    );
    setMovie(response.data.results);
    console.log(response.data.results);
  };

  useEffect(() => {
    fetchMovie();
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
        {movies.map((movie) => (
          <Movie key={movie.id} movie={movie} />
        ))}

        {/* <Movie />
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
        <Movie /> */}
      </Flex>
    </Container>
  );
};
