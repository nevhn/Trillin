import MissingPoster from "./MissingPoster.png";
import {
  ExternalLinkIcon,
  StarIcon,
  CheckIcon,
  PlusSquareIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Img,
  Heading,
  Text,
  Link,
  Fade,
  useDisclosure,
  useColorModeValue,
  Tooltip,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";

import { useAuth0 } from "@auth0/auth0-react";

export const Movie = (props: any) => {
  const { movie } = props;

  const { isAuthenticated } = useAuth0();

  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const [watchLater, setWatchLater] = useState<boolean>(false);

  const [isPosterValid, setIsPosterValid] = useState<boolean>(false);

  const { isOpen, onToggle } = useDisclosure();

  const bgOverview = useColorModeValue("#201C1C", "black");

  const textOverview = useColorModeValue("white", "white");

  const addToFavorites = () => {
    setIsFavorite(!isFavorite);
    const localFavorites = Object.values(
      JSON.parse(localStorage.getItem("favorites")!)
    );
    if (isFavorite) {
      /**Understand this logic more */
      console.log("current state: ", isFavorite);
      const newArr = localFavorites?.filter((obj: any) => obj.id != movie.id);
      localStorage.setItem("favorites", JSON.stringify(newArr));
      return;
    }
    const arr = [...localFavorites, movie];
    localStorage.setItem("favorites", JSON.stringify(arr));
    console.log(`added ${movie.id} to the completed list`);
  };

  /**TODO Completed the rest of this follow add to favor code */
  const addToCompleted = () => {
    setIsCompleted(!isCompleted);
    const localCompleted = Object.values(
      JSON.parse(localStorage.getItem("completed")!)
    );
    if (isCompleted) {
      const newArr = localCompleted?.filter((obj: any) => obj.id != movie.id);
      localStorage.setItem("completed", JSON.stringify(newArr));
      return;
    }
    const arr = [...localCompleted, movie];
    localStorage.setItem("completed", JSON.stringify(arr));
    console.log(`added ${movie.id} to the completed list`);
  };

  const addToWatchLater = () => {
    setWatchLater(!watchLater);
    const localWatchLater = Object.values(
      JSON.parse(localStorage.getItem("watch-later")!)
    );
    if (watchLater) {
      const newArr = localWatchLater?.filter((obj: any) => obj.id != movie.id);
      localStorage.setItem("watch-later", JSON.stringify(newArr));
      return;
    }
    const arr = [...localWatchLater, movie];
    localStorage.setItem("watch-later", JSON.stringify(arr));
    console.log(`added ${movie.id} to watch later`);
  };

  const initializeLocalFavorites = () => {
    const localFavorites = JSON.parse(localStorage.getItem("favorites")!);
    if (!localFavorites) {
      localStorage.setItem("favorites", "[]");
      return;
    }
    const matchId = localFavorites.find((obj: any) => obj.id === movie.id);
    if (matchId) setIsFavorite(true);
  };

  const initializeLocalCompleted = () => {
    const localCompleted = JSON.parse(localStorage.getItem("completed")!);
    if (!localCompleted) {
      localStorage.setItem("completed", "[]");
      return;
    }
    const matchId = localCompleted.find((obj: any) => obj.id === movie.id);
    if (matchId) setIsCompleted(true);
  };
  const initializeLocalWatchLater = () => {
    const localWatchLater = JSON.parse(localStorage.getItem("watch-later")!);
    if (!localWatchLater) {
      localStorage.setItem("watch-later", "[]");
      return;
    }
    const matchId = localWatchLater.find((obj: any) => obj.id === movie.id);
    if (matchId) setWatchLater(true);
  };

  const checkPosterUrl = async () => {
    const img = new Image() as HTMLImageElement;
    img.src = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;
    img.onload = function () {
      setIsPosterValid(img.naturalWidth > 0);
    };
  };

  useEffect(() => {
    /**Check if favorites in local storage is empty. If empty create the key and values | match the movie id with the fav movie id and isFav to true*/
    initializeLocalFavorites();
    initializeLocalCompleted();
    initializeLocalWatchLater();
    checkPosterUrl();
  }, []);

  return (
    <Box
      key={movie.id}
      className="movie"
      bg="red"
      overflow={"hidden"}
      pos={"relative"}
      w={"300px"}
      onMouseEnter={onToggle}
      onMouseLeave={onToggle}
      onClick={() => console.log(movie.id)}
    >
      <Img
        w={"100%"}
        src={
          isPosterValid
            ? `https://image.tmdb.org/t/p/original/${movie.poster_path}`
            : MissingPoster
        }
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
          {movie.title}
        </Heading>
        <Text
          as="span"
          color="#2891FC"
          fontWeight="bold"
          padding="0.25rem 0.5rem"
        >
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
            __css={{
              "&::-webkit-scrollbar": {
                w: "2",
              },
              "&::-webkit-scrollbar-track": {
                w: "6",
              },
              "&::-webkit-scrollbar-thumb": {
                borderRadius: "10",
                bg: `gray.100`,
              },
            }}
          >
            <Heading as="h3" mt="0" size="md" color={textOverview}>
              {movie.release_date}
            </Heading>
            <Heading as="h3" mt="0" size="lg" color={textOverview}>
              Overview
            </Heading>
            <Text color={textOverview}>{movie.overview}</Text>
            {/* <Text color={textOverview}> */}
            <Box>
              <Link
                color="teal.500"
                href={`/movie-info/${movie.id}`}
                isExternal
              >
                More info <ExternalLinkIcon mx="2px" />
              </Link>
            </Box>
            {isAuthenticated ? (
              <Flex justifyContent={"space-between"} mt="2rem">
                {/* Add tool lips */}
                <>
                  <Tooltip label="Save to your Completed ">
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
                      <CheckIcon
                        w={6}
                        h={6}
                        onClick={addToCompleted}
                        color={isCompleted ? "blue" : "white"}
                      />
                    </Box>
                  </Tooltip>
                  <Tooltip label="Save to your Favorites">
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
                        color={isFavorite ? "red" : "white"}
                      />
                    </Box>
                  </Tooltip>

                  <Tooltip label="Save to Watch later">
                    <Box
                      className="watchLaterBox"
                      __css={{
                        transform: "perspective(1px) translateZ(0)",
                        transitionDuration: "0.3s",
                        transitionProperty: "transform",
                        transitionTimingFunction: "ease-out",
                        _hover: { transform: "translateY(-8px)" },
                      }}
                      color={watchLater ? "orange" : "white"}
                    >
                      <PlusSquareIcon w={6} h={6} onClick={addToWatchLater} />
                    </Box>
                  </Tooltip>
                </>
              </Flex>
            ) : null}
            {/* </Text> */}
          </Box>
        </Fade>
      </Flex>
    </Box>
  );
};
