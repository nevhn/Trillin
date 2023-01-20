import { Movie } from "../../Components/Movie/Movie";
import { Flex, Heading, Center, Text, Container } from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";

export const WatchList = () => {
  const watchLater = JSON.parse(localStorage.getItem("watch-later")!);
  const { isAuthenticated, user } = useAuth0();
  // console.log(`watch later: ${watchLater}`);

  return isAuthenticated ? (
    <>
      <Center mt="1rem">
        <Heading as="h1" size="4xl">
          {user?.nickname}'s watch list
        </Heading>
        <Text ml="4px" as="span" color={"red.300"}>
          [{watchLater.length}]
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
        {watchLater?.map((movie: any) => (
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
