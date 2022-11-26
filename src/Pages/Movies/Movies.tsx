import { Container, Flex, Button, Box } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import MovieContext from "../../MovieContext/MovieContext";
import { Movie } from "../../Components/Movie/Movie";

export const Movies = () => {
  // const movieContext = useContext(MovieContext)
  const movieContext = useContext(MovieContext);
  console.log("page: ", movieContext?.page);

  const handlePrevPage = () => {
    movieContext?.setPage(movieContext.page - 1);
  };

  const handleNextPage = () => {
    movieContext?.setPage(movieContext.page + 1);
  };
  // const [movies, setMovie] = useState<any[]>([]);

  // const fetchMovie = async () => {
  //   const response = await axios(
  //     "https://api.themoviedb.org/3/movie/upcoming?api_key=13f9b567969342bbfb2322ca39624376&language=en-US&page=1"
  //   );
  //   setMovie(response.data.results);
  //   console.log(response.data.results);
  // };

  // useEffect(() => {
  //   fetchMovie();
  // }, []);

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
        {movieContext?.movies.map((movie) => (
          <Movie key={movie.id} movie={movie} />
        ))}
      </Flex>
      <Flex justifyContent={"space-between"} px="1rem">
        {movieContext?.page === 1 ? (
          <Box />
        ) : (
          <Button onClick={handlePrevPage}>Prev</Button>
        )}
        <Button onClick={handleNextPage}>Next</Button>
      </Flex>
    </Container>
  );
};
