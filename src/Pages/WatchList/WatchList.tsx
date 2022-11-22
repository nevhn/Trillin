import { Movie } from "../../Components/Movie/Movie";
import { Flex, Heading, Center, Box, BoxProps } from "@chakra-ui/react";

export const WatchList = () => {
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
        // bg= 'blue'
        mt="1rem"
        p="1"
        gap="1rem"
        // flexDir='row'
        // maxW="100%"
      >
        {/* <Box transform={"auto"} _hover={{ transform: "scale(1)" }}> */}
        {/* <Movie />
        </Box>
        <Movie />
        <Movie />
        <Movie />
        <Movie /> */}
      </Flex>
    </>
  );
};
