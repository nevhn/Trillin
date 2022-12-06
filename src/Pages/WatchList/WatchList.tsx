import { Movie } from "../../Components/Movie/Movie";
import { Flex, Heading, Center, Box, BoxProps } from "@chakra-ui/react";

export const WatchList = () => {
  const watchLater = JSON.parse(localStorage.getItem("watch-later")!);
  console.log(`watch later: ${watchLater}`);

  return (
    <>
      <Center mt="1rem">
        <Heading as="h1" size="4xl">
          {"Username"}'s watch list
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
        {watchLater?.map((movie: any) => (
          <Movie movie={movie} />
        ))}
      </Flex>
    </>
  );
};
