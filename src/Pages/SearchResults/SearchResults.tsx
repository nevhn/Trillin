import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Container, Flex, Box, Button } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { Movie } from "../../Components/Movie/Movie";
import MovieContext from "../../MovieContext/MovieContext";

export const SearchResults = () => {
  // const movieContext = useContext(MovieContext);

  const [movies, setMovie] = useState<any[]>([]);
  const [pageNum, setPageNum] = useState<number>(1);

  const { movieQuery } = useParams();
  console.log(movieQuery);

  // todo: fix page nav
  const fetchSearchResults = async () => {
    const response = await axios(
      `https://api.themoviedb.org/3/search/movie?api_key=13f9b567969342bbfb2322ca39624376&language=en-US&query=${movieQuery}&include_adult=false&region=US&page=` +
        pageNum
    );
    const listOfMovies = response.data.results;

    setMovie(listOfMovies);

    console.log(response.data);
  };

  const handlePrevPage = () => {
    setPageNum(pageNum - 1);
  };

  const handleNextPage = () => {
    setPageNum(pageNum + 1);
  };

  useEffect(() => {
    fetchSearchResults();
  }, [movieQuery, pageNum]);

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
      <Flex justifyContent={"space-between"} px="1rem">
        {pageNum === 1 ? (
          <Box />
        ) : (
          <Button onClick={handlePrevPage}>Prev</Button>
        )}
        <Button onClick={handleNextPage}>Next</Button>
      </Flex>
    </Container>
  );
};
