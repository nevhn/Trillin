import {
  ExternalLinkIcon,
  StarIcon,
  CheckIcon,
  AddIcon,
  PlusSquareIcon,
} from "@chakra-ui/icons";
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
  ScaleFade,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
// import axios from "axios";
import { useContext } from "react";
import MovieContext from "../../MovieContext/MovieContext";

export const Movie = (props: any) => {
  const movie = props.movie;
  const movieContext = useContext(MovieContext);

  const [isFavorite, setIsFavorite] = useState<boolean>();

  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onToggle } = useDisclosure();

  const bgOverview = useColorModeValue("#201C1C", "black");
  const textOverview = useColorModeValue("white", "white");

  const addToFavorites = () => {

    if (isFavorite){
      setIsFavorite(false)
/**TODO figure out how to remove item from array if id matches the passed id */
      const index = movieContext?.favorites.map((obj, i) => )
      movieContext?.favorites.splice(1, 1)

    }
    console.log(`added ${movie.id} to favorites`);

    console.log(movie);
    // movieContext?.setFavorites()
    movieContext?.setFavorites([...movieContext?.favorites, movie]);

    setIsFavorite(true);
    console.log(movieContext?.favorites);

    // call setFav()
  };
  const addToCompleted = () => {
    console.log("completed");
  };
  const addToWatchLater = () => {
    console.log("watch later");
  };

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
              <Box>
                <Link
                  color="teal.500"
                  href={`/movie-info/${movie.id}`}
                  isExternal
                >
                  More info <ExternalLinkIcon mx="2px" />
                </Link>
              </Box>
              <Flex justifyContent={"space-between"} mt="2rem">
                {/* Add tool lips */}
                <Box
                  className="CompletedBox"
                  __css={{
                    transform: "perspective(1px) translateZ(0)",
                    transitionDuration: "0.3s",
                    transitionProperty: "transform",
                    transitionTimingFunction: "ease-out",
                    _hover: { transform: "translateY(-8px)" },
                  }}
                >
                  <CheckIcon w={6} h={6} onClick={addToCompleted} />
                </Box>
                <Box
                  className="favoritesBox"
                  __css={{
                    transform: "perspective(1px) translateZ(0)",
                    transitionDuration: "0.3s",
                    transitionProperty: "transform",
                    transitionTimingFunction: "ease-out",
                    _hover: { transform: "translateY(-8px)" },
                  }}
                  // _hover={{
                  //   WebkitTransform: "translateY(-8px)",
                  //   transform: "translateY(-8px)",
                  // }}
                >
                  <StarIcon
                    w={6}
                    h={6}
                    onClick={addToFavorites}
                    color={isFavorite ? "red" : "blue"}
                  />
                </Box>

                <Box
                  className="watchLaterBox"
                  __css={{
                    transform: "perspective(1px) translateZ(0)",
                    transitionDuration: "0.3s",
                    transitionProperty: "transform",
                    transitionTimingFunction: "ease-out",
                    _hover: { transform: "translateY(-8px)" },
                  }}
                >
                  <PlusSquareIcon w={6} h={6} onClick={addToWatchLater} />
                </Box>
              </Flex>
            </Text>
          </Box>
        </Fade>
      </Flex>
    </Box>
  );
};
