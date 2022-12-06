import { Movie } from "../../Components/Movie/Movie";
import { Flex, Heading, Center, Box, BoxProps } from "@chakra-ui/react";

export const CompletedList = () => {
  const completed = JSON.parse(localStorage.getItem("completed")!);
  console.log(`completed: ${completed}`);

  return (
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
  );
};
