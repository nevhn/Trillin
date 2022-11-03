import {
  Box,
  Grid,
  GridItem,
  SimpleGrid,
  Center,
  Container,
} from "@chakra-ui/react";

export const Home = () => {
  return (
    <Container>
      {/* <Box bg="rebeccapurple" minW={"400px"} minH={"67vh"} display={"grid"}> */}
      <Box bg="aliceblue">
        <SimpleGrid
          // minChildWidth={"12px"}
          columns={[2, null, 3, 4, 5]}
          spacing={10}
        >
          <Box bg="tomato" w="100px" h="80px"></Box>
          <Box bg="tomato" h="80px"></Box>
          <Box bg="tomato" h="80px"></Box>
          <Box bg="tomato" h="80px"></Box>
          <Box bg="tomato" h="80px"></Box>
          <Box bg="tomato" h="80px"></Box>
          <Box bg="tomato" h="80px"></Box>
          <Box bg="tomato" h="80px"></Box>
          <Box bg="tomato" h="80px"></Box>
          <Box bg="tomato" h="80px"></Box>
        </SimpleGrid>
      </Box>
      {/* </Box> */}
      {/* <Box> */}
      {/* <Grid
          justifyItems={"stretch"}
          templateColumns="repeat(12,calc(8.33333% - .91667 * 1.5rem - 0rem))"
          gap={2}
        >
          <GridItem
            colSpan={2}
            minW={"auto"}
            w="100%"
            display={"inline-flex"}
            flexDirection={"column"}
            position={"relative"}
            bg="blue.500"
          >
            <Box w= "100%">Hello</Box>
          </GridItem>
          <GridItem w="100%" h="10" bg="blue.500"></GridItem>
          <GridItem w="100%" h="10" bg="blue.500"></GridItem>
          <GridItem w="100%" h="10" bg="blue.500"></GridItem>
          <GridItem w="100%" h="10" bg="blue.500"></GridItem>
          <GridItem w="100%" h="10" bg="blue.500"></GridItem>
          <GridItem w="100%" h="10" bg="blue.500"></GridItem>
          <GridItem w="100%" h="10" bg="blue.500"></GridItem>
          <GridItem w="100%" h="10" bg="blue.500"></GridItem>
          <GridItem w="100%" h="10" bg="blue.500"></GridItem>
          <GridItem w="100%" h="10" bg="blue.500"></GridItem>
          <GridItem w="100%" h="10" bg="blue.500"></GridItem>
          <GridItem w="100%" h="10" bg="blue.500"></GridItem>
          <GridItem w="100%" h="10" bg="blue.500"></GridItem>
          <GridItem w="100%" h="10" bg="blue.500"></GridItem>
        </Grid> */}
      {/* </Box> */}
    </Container>
  );
};
