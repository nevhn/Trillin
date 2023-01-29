import { Container, Flex, Button, Box, Center } from "@chakra-ui/react";
import { useContext } from "react";
import MovieContext from "../../MovieContext/MovieContext";
import { Movie } from "../../Components/Movie/Movie";

export const Movies = () => {
  const movieContext = useContext(MovieContext);

  console.log("page: ", movieContext?.page);

  const handlePrevPage = () => {
    movieContext?.setPage(movieContext.page - 1);
  };

  const handleNextPage = () => {
    movieContext?.setPage(movieContext.page + 1);
  };

  // const disableButton = () => {
  //   setIsDisabled(movieContext?.isResultsEmpty as boolean);
  //   console.log("disabled button");
  // };

  // useEffect(() => {
  //   disableButton();
  // }, [movieContext?.isResultsEmpty]);

  // setIsDisabled(false)
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
        p="1"
        gap="1rem"
      >
        {movieContext?.isResultsEmpty ? (
          <Center h="74vh">No results were found </Center>
        ) : null}
        {movieContext?.movies.map((movie) => (
          <Movie key={movie.id} movie={movie} isFav={false} />
        ))}
      </Flex>
      <Flex justifyContent={"space-between"} px="1rem" mt="10em" mb="10em">
        {movieContext?.page === 1 ? (
          <Box />
        ) : (
          <Button
            bgColor="red.600"
            onClick={handlePrevPage}
            _hover={{
              bgColor: "red.400",
              // outlineColor: "red",
            }}
          >
            {" "}
            Prev
          </Button>
        )}
        <Button
          disabled={movieContext?.isResultsEmpty}
          onClick={handleNextPage}
          bgColor="red.600"
          _hover={{
            bgColor: "red.400",
            // outlineColor: "red",
          }}
        >
          Next
        </Button>
      </Flex>
    </Container>
  );
};
