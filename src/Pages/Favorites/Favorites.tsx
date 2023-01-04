import { Flex, Heading, Center, Box } from "@chakra-ui/react";
import { Movie } from "../../Components/Movie/Movie";
import { useAuth0 } from "@auth0/auth0-react";

export const Favorites = () => {
  const favorites = JSON.parse(localStorage.getItem("favorites")!);
  const { isAuthenticated, isLoading, user } = useAuth0();
  console.log("fav", favorites);

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

  // const username = user.name

  return isAuthenticated ? (
    <>
      <Center mt="1rem">
        <Heading as="h1" size="4xl">
          {user?.nickname}'s favorites
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
  ) : (
    <Box>You need to be logged in</Box>
  );
};
