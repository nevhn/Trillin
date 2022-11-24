import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Flex, list } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { Movie } from "../../Components/Movie/Movie";

export const SearchResults = () => {
  const [movies, setMovie] = useState<any[]>([]);

  const { movieQuery } = useParams();
  console.log(movieQuery);

  const fetchSearchResults = async () => {
    const response = await axios(
      `https://api.themoviedb.org/3/search/movie?api_key=13f9b567969342bbfb2322ca39624376&language=en-US&page=1&query=${movieQuery}&include_adult=false&region=US`
    );
    const listOfMovies = response.data.results;

    setMovie(listOfMovies);

    console.log(response.data);
  };

  useEffect(() => {
    fetchSearchResults();
  }, []);

  return (
    <Container
      maxW={{ base: "100ch", md: "", lg: "200ch", xl: "1000ch" }}
      mt="1.5rem"
    >
      <Flex
        flexWrap={"wrap"}
        justifyContent="center"
        alignItems={"center"}
        p="1"
        gap="1rem"
      >
        {movies.map((movie) => (
          <Movie key={movie.id} movie={movie} />
        ))}
      </Flex>
    </Container>
  );
};
