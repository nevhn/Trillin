import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import {
  ChakraProvider,
  // theme,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import theme from "./theme";
import { Logo } from "./Logo";
import { NavBar } from "./Components/NavBar/NavBar";
import { Footer } from "./Components/Footer/Footer";
import { Movies } from "./Pages/Movies/Movies";
import { MovieInfo } from "./Pages/MovieInfo/MovieInfo";
import { RouteError } from "./Pages/Error/RouteError";
import { Favorites } from "./Pages/Favorites/Favorites";
import { WatchList } from "./Pages/WatchList/WatchList";
import { CompletedList } from "./Pages/CompletedList/CompletedList";
import { Logout } from "./Pages/Logout/Logout";
import { BgCircle } from "./Components/BgCircle/BgCircle";
import { SearchResults } from "./Pages/SearchResults/SearchResults";
import MovieContext from "./MovieContext/MovieContext";
import axios from "axios";

// const infoMovieContext: Movue = {
// }

export const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Movies />,
      errorElement: <RouteError />,
    },
    {
      path: "movie-info/:movieId",
      element: <MovieInfo />,
    },
    {
      path: "favorites",
      element: <Favorites />,
    },
    {
      path: "watch-list",
      element: <WatchList />,
    },
    {
      path: "completed-list",
      element: <CompletedList />,
    },
    {
      path: "logout",
      element: <Logout />,
    },
    // {
    //   path: "search/:movieQuery",
    //   element: <SearchResults />,
    // },
  ]);
  const [movies, setMovies] = useState<any[]>([]);

  const fetchMovies = async () => {
    const response = await axios.get(
      "https://api.themoviedb.org/3/movie/upcoming?api_key=13f9b567969342bbfb2322ca39624376&language=en-US&page=1"
    );

    setMovies(response.data.results);
    console.log(response.data.results);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <MovieContext.Provider
      value={{ query: "hello", movies: movies, setMovies: setMovies }}
    >
      <ChakraProvider theme={theme}>
        {/* <BgCircle /> */}
        <NavBar />
        <RouterProvider router={router} />
        <Footer />
        {/* <NavLink children={"Hello"} /> */}
        {/* <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
      <ColorModeSwitcher justifySelf="flex-end" />
      <VStack spacing={8}>
      <Logo h="40vmin" pointerEvents="none" />
      <Text>
      Edit <Code fontSize="xl">src/App.tsx</Code> and save to reload.
      </Text>
      <Link
      color="teal.500"
      href="https://chakra-ui.com"
      fontSize="2xl"
      target="_blank"
      rel="noopener noreferrer"
      >
      Learn Chakra
      </Link>
      </VStack>
      </Grid>
    </Box> */}
      </ChakraProvider>
    </MovieContext.Provider>
  );
};
