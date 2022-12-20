import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
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
import { NavBar2 } from "./Components/NavBar/NavBar2";

const AppLayout = () => (
  <>
    <NavBar />
    <Outlet />
  </>
);

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Movies />,
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
      {
        path: "search/:movieQuery",
        element: <SearchResults />,
      },
    ],
    errorElement: <RouteError />,
  },
]);

export const App = () => {
  const [movies, setMovies] = useState<any[]>([]);

  const [emptyInput, setEmptyInput] = useState(false);

  const [page, setPage] = useState(1);

  const [favorites, setFavorites] = useState<any[]>([]);

  const [completed, setCompleted] = useState<any[]>([]);

  const [watchLater, setWatchLater] = useState<any[]>([]);

  const fetchMovies = async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=13f9b567969342bbfb2322ca39624376&language=en-US&page=${page}`
    );
    const listOfMovies = response.data.results;
    setMovies(listOfMovies);
    console.log(response.data.results);
  };

  useEffect(() => {
    fetchMovies();
    console.log("refreshed");
  }, [emptyInput, page]);

  return (
    <MovieContext.Provider
      value={{
        page,
        setPage,
        movies,
        setMovies,
        emptyInput,
        setEmptyInput,
        favorites,
        setFavorites,
        completed,
        setCompleted,
        watchLater,
        setWatchLater,
      }}
    >
      <ChakraProvider theme={theme}>
        <RouterProvider router={router} />
        <Footer />
      </ChakraProvider>
    </MovieContext.Provider>
  );
};
