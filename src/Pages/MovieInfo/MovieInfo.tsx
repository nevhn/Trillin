import { useState, useEffect } from "react";
import { Box, AspectRatio, Flex, Text, Heading, Link } from "@chakra-ui/react";

import { useParams } from "react-router-dom";
import axios from "axios";
import { ExternalLinkIcon } from "@chakra-ui/icons";

/**CLEAN THIS UP */
export const MovieInfo = () => {
  const [movie, setMovie] = useState<any>({});
  const [trailerUrl, setTrailerUrl] = useState("");
  const [parentalRating, setParentalRating] = useState("");
  const [cast, setCast] = useState<any[]>([]);
  const [crew, setCrew] = useState("");
  const [genres, setGenre] = useState<any[]>([]);
  const [runtime, setRuntime] = useState("");
  const [poster, setPoster] = useState("");

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

      const posterPath = response.data["poster_path"];

      const listOfReleaseDates = response.data["release_dates"].results;

      const listOfCredits = response.data["credits"];

      let releaseDate;
      /**Find parental rating */

      if (listOfReleaseDates.length === 1) {
        releaseDate = listOfReleaseDates.find((date: any) => date.iso_3166_1);
      } else {
        releaseDate = listOfReleaseDates.find(
          (date: any) => date.iso_3166_1 === "US"
        );
      }

      const certification = releaseDate.release_dates[0].certification;

      /**Genre */

      const listOfGenres: any[] = [];

      movieInfo.genres.find((obj: any) => {
        listOfGenres.push(obj.name);
      });

      const castArr = listOfCredits.cast;

      const crewArr = listOfCredits.crew;

      /**Find director and actors */
      const director = crewArr.find((c: any) => c.job === "Director");

      const actors: any[] = [];

      castArr.forEach((obj: any) => {
        actors.push(obj.name);
      });

      /**Parse runtime : 135 -> 1 hour $ 35 minutes | 1 hour 1 minute */
      const rawRuntime = movieInfo.runtime.toString();

      const hour = rawRuntime[0];

      let minutes = rawRuntime.slice(1);

      let parsedHour = hour === "1" ? `${hour} hour` : `${hour} hours`;

      let parsedMinute =
        minutes === "01" ? `${minutes} Minute` : `${minutes} minutes`;

      let parsedRuntime = `${parsedHour} & ${parsedMinute} `;

      setRuntime(parsedRuntime);

      setMovie(movieInfo);
      setParentalRating(certification);
      setCrew(director["name"]);
      setCast(actors);
      setGenre(listOfGenres);
      setPoster(`https://image.tmdb.org/t/p/original${posterPath}`);

      console.log("movieInfo: ", movieInfo);
      console.log("crew: ", actors);
      console.log("director: ", director);
      console.log("runtime:", runtime);
      console.log("hour: ", hour);
      console.log("min: ", minutes);
      console.log(poster);
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
    <Box m="1rem">
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
        justifyContent={"space-between"}
        m={["1rem", "2rem", null, null]}
      >
        <Box>
          <Heading color="#2891FC">{movie.title}</Heading>
          <Heading as="h3" size="1xl">
            {/* October 4, 1995 */}
            {movie.release_date}
          </Heading>
          <Text as="span">
            {/* A teenage boy finds himself recruited as a member of an elite team
            of pilots by his father. */}
            {movie.overview}
          </Text>

          {/* Date released/ Upcoming */}
        </Box>

        <Box>
          {/* Rating */}
          {/* TODO: Fix rating not showing up on some movies */}
          <Heading>{`Rating ${parentalRating ? parentalRating : "?"}`}</Heading>

          {/* Directors & Writers */}
          <Text fontWeight={"bold"} as="span">
            Director{" "}
          </Text>
          <Text as="span">{crew}</Text>
          <br />

          {/* Cast*/}
          <Text fontWeight={"bold"} as="span">
            Cast{" "}
          </Text>
          <Text as="span">
            {cast.map((actor) => (
              <Text key={actor} as="p">
                {" "}
                {actor}{" "}
              </Text>
            ))}
          </Text>
          <br />
          {/* Genre*/}

          <Text fontWeight={"bold"} as="span">
            Genre{" "}
          </Text>
          <Text as="span">
            {genres.map((genre) => (
              <Text key={genre} as="p">
                {" "}
                {genre}
              </Text>
            ))}
          </Text>
          <br />
          {/* Run Time*/}
          <Text fontWeight={"bold"} as="span">
            Run Time{" "}
          </Text>
          <Text as="span">{runtime}</Text>
        </Box>
      </Flex>
    </Box>
  );
};
