import { Movie } from "../../Components/Movie/Movie";
import { Flex, Heading, Center, Box, Spinner } from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";

export const WatchList = () => {
  const watchLater = JSON.parse(localStorage.getItem("watch-later")!);
  const { isLoading, isAuthenticated } = useAuth0();
  console.log(`watch later: ${watchLater}`);

  // if (isLoading) {
  //   return (
  //     <Center mt="1rem">
  //       <Spinner
  //         thickness="4px"
  //         speed="0.65s"
  //         emptyColor="gray.200"
  //         color="blue.500"
  //         size="xl"
  //         textAlign={"center"}
  //       />
  //     </Center>
  //   );
  // }

  return isAuthenticated ? (
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
  ) : (
    <Box>You need to be logged in</Box>
  );
};
