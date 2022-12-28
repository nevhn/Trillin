import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  ChakraProvider,
  // theme,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import theme from "./theme";
import { NavBar } from "./Components/NavBar/NavBar";
import { Footer } from "./Components/Footer/Footer";
import { Movies } from "./Pages/Movies/Movies";
import { MovieInfo } from "./Pages/MovieInfo/MovieInfo";
import { RouteError } from "./Pages/Error/RouteError";
import { Favorites } from "./Pages/Favorites/Favorites";
import { WatchList } from "./Pages/WatchList/WatchList";
import { CompletedList } from "./Pages/CompletedList/CompletedList";
// import { Logout } from "./Pages/Logout/Logout";
import { SearchResults } from "./Pages/SearchResults/SearchResults";
import MovieContext from "./MovieContext/MovieContext";
import axios from "axios";
import { BgCircle } from "./Components/BgCircle/BgCircle";

import { useAuth0 } from "@auth0/auth0-react";

const AppLayout = () => (
  <>
    <NavBar />
    {/* <BgCircle /> */}
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
      // {
      //   path: "logout",
      //   element: <Logout />,
      // },
      {
        path: "search/:movieQuery",
        element: <SearchResults />,
      },
    ],
    errorElement: <RouteError />,
  },
]);

export const App = () => {
  const { isLoading, isAuthenticated } = useAuth0();

  const [url, setUrl] = useState(
    "https://api.themoviedb.org/3/movie/upcoming?api_key=13f9b567969342bbfb2322ca39624376&language=en-US"
  );

  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState<any[]>([]);

  const [emptyInput, setEmptyInput] = useState(false);

  // const [searchPageNum, setSearchPageNum] = useState(1);

  const [favorites, setFavorites] = useState<any[]>([]);

  const [completed, setCompleted] = useState<any[]>([]);

  const [watchLater, setWatchLater] = useState<any[]>([]);

  /**
   * TODO:
   * Figure out a way to take the current url and append the new number page
   */
  // const [url, setUrl] = useState()

  const fetchMovies = async () => {
    // if (!url) {
    //   console.log("?");
    //   setUrl(
    //     `https://api.themoviedb.org/3/movie/upcoming?api_key=13f9b567969342bbfb2322ca39624376&language=en-US&page=`
    //   );
    // }
    const response = await axios.get(url);
    // const response = await axios.get(
    //   `https://api.themoviedb.org/3/movie/upcoming?api_key=13f9b567969342bbfb2322ca39624376&language=en-US&page=${pageNum}`
    // );
    const listOfMovies = response.data.results;
    setMovies(listOfMovies);
    console.log(response.data.results);
  };

  // const restPage = () => {
  //   setUrl;
  // };

  useEffect(() => {
    fetchMovies();
  }, [emptyInput, url]);

  useEffect(() => {
    const fetchNextPage = async () => {
      const response = await axios.get(url + `&page=${page}`);
      setMovies(response.data.results);
    };
    fetchNextPage();
  }, [page]);

  return (
    <MovieContext.Provider
      value={{
        url,
        setUrl,
        // maybe don't add these two page vars
        page,
        setPage,
        // searchPageNum,
        // setSearchPageNum,
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
