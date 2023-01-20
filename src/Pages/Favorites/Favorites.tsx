import { Flex, Heading, Center, Container, Text } from "@chakra-ui/react";
import { Movie } from "../../Components/Movie/Movie";
import { useAuth0 } from "@auth0/auth0-react";

export const Favorites = () => {
  const favorites = JSON.parse(localStorage.getItem("favorites")!);
  const { isAuthenticated, user } = useAuth0();
  // console.log("fav", favorites);

  return isAuthenticated ? (
    <>
      <Center mt="1rem">
        <Heading as="h1" size="4xl">
          {user?.nickname}'s favorites
        </Heading>
        <Text ml="4px" as="span" color={"red.300"}>
          [{favorites.length}]
        </Text>
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
    <Container mt="1rem">
      <Heading>You need to be logged in</Heading>
    </Container>
  );
};
