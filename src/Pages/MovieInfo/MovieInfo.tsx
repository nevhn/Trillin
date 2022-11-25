import { useState, useEffect } from "react";
import { Box, AspectRatio, Flex, Text, Heading } from "@chakra-ui/react";

import { useParams } from "react-router-dom";
import axios from "axios";

export const MovieInfo = () => {
  const [movie, setMovie] = useState<any>({});
  const [trailerUrl, setTrailerUrl] = useState("");
  const [parentalRating, setParentalRating] = useState("");
  const [cast, setCast] = useState<any[]>([]);
  const [crew, setCrew] = useState("");
  const [genres, setGenre] = useState<any[]>([]);

  /**Get query params : movieID to pass to the api call*/
  let { movieId } = useParams();

  const fetchMovieInfo = async () => {
    /** Fetch details about the movie, official trailer, cast */
    const response = await axios(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=13f9b567969342bbfb2322ca39624376&language=en-US&append_to_response=release_dates,credits,videos`
    );

    const movieInfo = response.data;
    const listOfReleaseDates = response.data["release_dates"].results;
    const listOfCredits = response.data["credits"];

    /**Find parental rating */
    const usReleaseDate = listOfReleaseDates.find(
      (date: any) => date.iso_3166_1 === "US"
    );

    const certification = usReleaseDate.release_dates[0].certification;

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

    // console.log("filtered:", director);

    setMovie(movieInfo);
    setParentalRating(certification);
    setCrew(director["name"]);
    setCast(actors);
    setGenre(listOfGenres);

    console.log("movieInfo: ", response.data);
    console.log("crew: ", actors);
    console.log("director: ", director);
  };

  const fetchMovieTrailer = async () => {
    const response = await axios(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=13f9b567969342bbfb2322ca39624376&language=en-US`
    );
    // console.log(response.data);
    const results = response.data.results;

    /**Filter through array of objects where key matches string */
    const officialTrailerObj = results.find((obj: any) =>
      obj.name.includes("Official")
    );
    const trailerKey = officialTrailerObj["key"];
    /**Youtube base url */
    const url = `https://www.youtube.com/embed/${trailerKey}`;

    setTrailerUrl(url);
    console.log("trailer: ", officialTrailerObj);
  };

  useEffect(() => {
    fetchMovieInfo();
    fetchMovieTrailer();
  }, []);
  return (
    <Box m="1rem">
      <AspectRatio
        className="videoWrapper"
        m="auto"
        maxW={["25em", "80em"]}
        ratio={16 / 9}
      >
        <Box
          as="iframe"
          title=""
          // src="https://www.youtube.com/embed/13nSISwxrY4"
          src={trailerUrl}
          allowFullScreen
        />
      </AspectRatio>
      <Flex
        className="movie-desc"
        direction={["column", "row"]}
        justifyContent={"space-between"}
        m={["1rem", "2rem", null, null]}
      >
        <Box>
          <Heading color="#2891FC">{movie.original_title}</Heading>
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
          <Heading>{`Rating : ${parentalRating}`}</Heading>

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
              <Text as="p"> {actor} </Text>
            ))}
          </Text>
          <br />
          {/* Genre*/}

          <Text fontWeight={"bold"} as="span">
            Genre{" "}
          </Text>
          <Text as="span">
            {genres.map((genre) => (
              <Text as="p"> {genre}</Text>
            ))}
          </Text>
          <br />
          {/* Run Time*/}
          <Text fontWeight={"bold"} as="span">
            Run Time{" "}
          </Text>
          <Text as="span">{movie.runtime}</Text>
          {"\n"}
        </Box>
      </Flex>
    </Box>
  );
};
