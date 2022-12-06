import { Flex, Heading, Center, Box, BoxProps } from "@chakra-ui/react";
import { useContext } from "react";
import { Movie } from "../../Components/Movie/Movie";
import MovieContext from "../../MovieContext/MovieContext";

export const Favorites = () => {
  const favorites = JSON.parse(localStorage.getItem("favorites")!);
  console.log("fav", favorites);

  return (
    <>
      <Center mt="1rem">
        <Heading as="h1" size="4xl">
          {"Username"}'s favorites
        </Heading>
      </Center>
      <Flex
        className="movie-main"
        flexWrap={"wrap"}
        justifyContent="center"
        align-items="center"
        mt="1rem"
        p="1"
        gap="1rem"
      >
        {favorites?.map((movie: any) => (
          <Movie movie={movie} />
        ))}
      </Flex>
    </>
  );
};
