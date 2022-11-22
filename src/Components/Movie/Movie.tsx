import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Box,
  Grid,
  GridItem,
  SimpleGrid,
  Center,
  Container,
  Flex,
  Spacer,
  Img,
  Heading,
  Text,
  Link,
  Fade,
  useDisclosure,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
// import { useState, useEffect } from "react";
// import axios from "axios";

export const Movie = (props: any) => {
  const movie = props.movie;
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onToggle } = useDisclosure();

  const bgOverview = useColorModeValue("#201C1C", "black");
  const textOverview = useColorModeValue("white", "white");

  return (
    <Box
      key={movie.id}
      className="movie"
      bg="red"
      overflow={"hidden"}
      pos={"relative"}
      w={"300px"}
      // mt="0.5rem"
      // mx="0.3rem"
      onMouseEnter={onToggle}
      onMouseLeave={onToggle}
      onClick={() => console.log(movie.id)}
    >
      <Img
        w={"100%"}
        // src="https://m.media-amazon.com/images/M/MV5BODZkZjUxNmEtMGEyOS00ZDY5LTkxZDMtZTJkZDBiZTkyOWRkXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg"
        src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
      />
      <Flex
        className="move-data"
        alignItems={"center"}
        justifyContent={"space-between"}
        padding="0.5rem 1rem 1rem"
        letterSpacing="0.5px"
        bg={"eee"}
      >
        <Heading as="h3" m="0" size="lg" fontWeight="bold">
          {/* Neon Genesis Evangelion */}
          {movie.original_title}
        </Heading>
        <Text
          as="span"
          color="#2891FC"
          fontWeight="bold"
          padding="0.25rem 0.5rem"
        >
          {/* 8.5 */}
          {movie.vote_average}
        </Text>
        <Fade in={isOpen}>
          <Box
            className="overview"
            bg={bgOverview}
            pos="absolute"
            p="2rem"
            overflow="auto"
            maxHeight="100%"
            left="0"
            bottom="0"
            right="0"
          >
            <Heading as="h3" mt="0" size="md" color={textOverview}>
              {/* October 4, 1995 */}
              {movie.release_date}
            </Heading>
            <Heading as="h3" mt="0" size="lg" color={textOverview}>
              Overview
            </Heading>
            <Text color={textOverview}>
              {/* A teenage boy finds himself recruited as a member of an elite
                  team of pilots by his father. */}
              {movie.overview}
            </Text>
            <Text color={textOverview}>
              <Link
                color="teal.500"
                href={`/movie-info/${movie.id}`}
                isExternal
              >
                More info <ExternalLinkIcon mx="2px" />
              </Link>
            </Text>
          </Box>
        </Fade>
      </Flex>
    </Box>
  );
};
