import { useState, useEffect } from "react";
import { Box, AspectRatio, Flex, Text, Heading, Link } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ExternalLinkIcon } from "@chakra-ui/icons";

export const MovieInfo = () => {
  const [movie, setMovie] = useState<any>({});
  const [trailerUrl, setTrailerUrl] = useState("");
  const [parentalRating, setParentalRating] = useState("");
  const [cast, setCast] = useState<any[]>([]);
  const [crew, setCrew] = useState("");
  const [genres, setGenre] = useState<any[]>([]);
  const [runtime, setRuntime] = useState("");
  // const [imdbId, setImdbId] = useState("");
  // const [poster, setPoster] = useState("");

  /**Get query params : movieID to pass to the api call*/
  let { movieId } = useParams();

  const fetchMovieInfo = async () => {
    /** Fetch details about the movie, official trailer, cast */
    try {
      const response = await axios(
        `https://api.themoviedb.org/3/movie/${movieId}?api_key=13f9b567969342bbfb2322ca39624376&language=en-US&append_to_response=release_dates,credits,videos`
      );
      console.log("response", response.data);
      const movieInfo = response.data;
      setMovie(movieInfo);

      // setImdbId(response.data["imdb_id"]);
      // const posterPath = response.data["poster_path"];

      const listOfReleaseDates = response.data["release_dates"].results;

      const listOfCredits = response.data["credits"];

      let releaseDate: any = [];

      /**Find parental rating */
      if (listOfReleaseDates.length === 1) {
        releaseDate = listOfReleaseDates.find((date: any) => date.iso_3166_1);
      } else {
        releaseDate = listOfReleaseDates.find(
          (date: any) => date.iso_3166_1 === "US"
        );
      }
      const certification = releaseDate.release_dates[0].certification;
      setParentalRating(certification);

      /**Genre */
      const listOfGenres: any[] = [];
      movieInfo.genres.find((obj: any) => {
        listOfGenres.push(obj.name);
      });
      setGenre(listOfGenres);

      /**Find director and actors */
      const castArr = listOfCredits.cast;
      const crewArr = listOfCredits.crew;
      const director = crewArr.find((c: any) => c.job === "Director");
      setCrew(director["name"]);
      const actors: any[] = [];
      castArr.forEach((obj: any) => {
        actors.push(obj.name);
      });
      setCast(actors);

      /**Parse runtime : 135 -> 1 hour $ 35 minutes | 1 hour 1 minute */
      const rawRuntime = movieInfo.runtime.toString();
      const hour = rawRuntime[0];
      let minutes = rawRuntime.slice(1);
      let parsedHour = hour === "1" ? `${hour} hour` : `${hour} hours`;
      let parsedMinute =
        minutes === "01" ? `${minutes} Minute` : `${minutes} minutes`;
      let parsedRuntime = `${parsedHour} ${parsedMinute} `;
      setRuntime(parsedRuntime);

      // setPoster(`https://image.tmdb.org/t/p/original${posterPath}`);

      // console.log("movieInfo: ", movieInfo);
      // console.log("crew: ", actors);
      // console.log("director: ", director);
      // console.log("runtime:", runtime);
      // console.log("hour: ", hour);
      // console.log("min: ", minutes);
      // console.log(poster);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchMovieTrailer = async () => {
    try {
      const response = await axios(
        `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=13f9b567969342bbfb2322ca39624376&language=en-US`
      );
      const results = response.data.results;

      /**Filter through array of objects where key matches string */
      let officialTrailerObj = results.find((obj: any) =>
        obj.name.includes("Official")
      );

      if (!officialTrailerObj) {
        officialTrailerObj = results.find((obj: any) =>
          obj.name.includes("Trailer")
        );
      }
      console.log("officialTrailerObj", officialTrailerObj);
      const trailerKey = officialTrailerObj["key"];
      /**Youtube base url */
      const url = `https://www.youtube.com/embed/${trailerKey}`;

      setTrailerUrl(url);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMovieInfo();
    fetchMovieTrailer();
  }, []);
  return (
    <Box m="1rem" h={"max-content"}>
      {!trailerUrl ? (
        <Box textAlign={"center"} h="2rem">
          Cannot find trailer for this movie.
          <Link
            color="teal.500"
            href={`https://www.google.com/search?q=${movie.title} trailer`}
            isExternal
            pl="1rem"
          >
            Search <ExternalLinkIcon mx="2px" />
          </Link>
        </Box>
      ) : null}
      <AspectRatio
        className="videoWrapper"
        m="auto"
        maxW={["25em", "80em"]}
        ratio={16 / 9}
      >
        <Box as="iframe" title="" src={trailerUrl} allowFullScreen />
      </AspectRatio>
      <Flex
        className="movie-desc"
        direction={["column", "row"]}
        p="1rem"
        w={{ base: "100%", xl: "53%" }}
        m="auto"
      >
        <Flex className="movie-desc" flexDirection={"column"} mt="1rem">
          <Heading mb="1rem" color="red">
            {movie.title}
          </Heading>
          <Flex gap="4">
            <Heading as="h3" size="1xl">
              {movie.release_date}
            </Heading>
            <Text>|</Text>
            <Heading as="h3" size="1xl">
              Rating
              <Text as="span" textColor={"red.600"} pl="1rem">
                {parentalRating ? parentalRating : "?"}
              </Text>
            </Heading>
            <Text>|</Text>
            <Heading as="h3" size="1xl">
              <Link
                color="blue.500"
                href={`https://www.imdb.com/title/${movie.imdb_id}/`}
                isExternal
              >
                Imdb <ExternalLinkIcon mx="2px" />
              </Link>
            </Heading>
            <Text>|</Text>
            <Heading as="h3" size="1xl">
              <Link color="blue.500" href={`${movie.homepage}`} isExternal>
                Homepage <ExternalLinkIcon mx="2px" />
              </Link>
            </Heading>
          </Flex>
          <Box mt="1rem" w={{ base: "90%" }}>
            <Text as="span">{movie.overview}</Text>
          </Box>
        </Flex>

        <Flex
          className="more-info-sidebar"
          flexDirection={"column"}
          w={{ base: "35em" }}
          p="1rem"
        >
          {/* Run Time*/}
          <Text fontWeight={"bold"} as="span">
            Run Time{" "}
          </Text>
          <Text as="span">{runtime}</Text>
          <br />
          <Text fontWeight={"bold"} as="span">
            Genre{" "}
          </Text>
          <Text as="span">
            {genres.map((genre) => (
              <Text key={genre} as="p">
                {genre}
              </Text>
            ))}
          </Text>
        </Flex>
        <Flex
          className="cast-sidebar"
          flexDirection={"column"}
          w="35em"
          h="25em"
          p="1rem"
          overflowY="scroll"
          __css={{
            "&::-webkit-scrollbar": {
              w: "4px",
            },
            "&::-webkit-scrollbar-track": {
              w: "6",
            },
            "&::-webkit-scrollbar-thumb": {
              borderRadius: "10",
              bg: `gray.300`,
            },
          }}
        >
          {/* Directors & Writers */}
          <Text fontWeight={"bold"} as="span">
            Director{" "}
          </Text>
          <br />
          <Text as="span">{crew}</Text>
          <br />
          <Text fontWeight={"black"} as="span">
            Cast{" "}
          </Text>
          <br />
          <Text as="span">
            {cast.map((actor) => (
              <Text key={actor} as="p" pb="0.1rem">
                {actor}
              </Text>
            ))}
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};
