import * as React from "react";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  // theme,
} from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import theme from "./theme";
import { Logo } from "./Logo";
import { NavBar } from "./Components/NavBar/NavBar";
import { Footer } from "./Components/Footer/Footer";
import { Home } from "./Pages/Home/Home";
import { MovieInfo } from "./Pages/MovieInfo/MovieInfo";
import { RouteError } from "./Pages/Error/RouteError";
import { Favorites } from "./Pages/Favorites/Favorites";
import { WatchList } from "./Pages/WatchList/WatchList";
import { CompletedList } from "./Pages/CompletedList/CompletedList";
import { Logout } from "./Pages/Logout/Logout";
import { BgCircle } from "./Components/BgCircle/BgCircle";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <RouteError />,
  },
  {
    path: "movie-info",
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
]);

export const App = () => (
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
);
