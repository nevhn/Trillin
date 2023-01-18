import { Movie } from "../../Components/Movie/Movie";
import { Flex, Heading, Center, Box } from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";

export const CompletedList = () => {
  const completed = JSON.parse(localStorage.getItem("completed")!);
  const { isAuthenticated } = useAuth0();
  console.log(`completed: ${completed}`);

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
          {"Username"}'s completed list
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
        {completed?.map((movie: any) => (
          <Movie movie={movie} />
        ))}
      </Flex>
    </>
  ) : (
    <Box>You need to be logged in</Box>
  );
};
