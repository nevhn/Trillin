import { useState, useContext, useEffect } from "react";

import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Stack,
  Center,
  IconButton,
  Input,
  Select,
  Heading,
} from "@chakra-ui/react";

import { SearchIcon } from "@chakra-ui/icons";

import MovieContext from "../../MovieContext/MovieContext";

import { useLocation, useNavigate } from "react-router-dom";

import { useAuth0 } from "@auth0/auth0-react";

export const NavBar = () => {
  const navigate = useNavigate();

  const movieContext = useContext(MovieContext);

  const [query, setQuery] = useState("");

  const [selectedOption, setSelectedOption] = useState("upcoming");

  // const { isOpen, onOpen, onClose } = useDisclosure();

  const currentPath = useLocation().pathname;

  const { loginWithRedirect, user, isAuthenticated, isLoading, logout } =
    useAuth0();

  const searchQuery = async (query: string) => {
    // const response = await axios.get(
    //   `https://api.themoviedb.org/3/search/movie?api_key=13f9b567969342bbfb2322ca39624376&language=en-US&page=${movieContext?.page}&query=${query}&include_adult=false&region=US`
    // );
    // const listOfMovies = response.data.results;
    // movieContext?.setMovies(listOfMovies);
    movieContext?.setUrl(
      `https://api.themoviedb.org/3/search/movie?api_key=13f9b567969342bbfb2322ca39624376&language=en-US&query=${query}&include_adult=false&region=US`
    );

    movieContext?.setEmptyInput(false);
    // movieContext?.setPage(1);
    /**TODO: reset page to 1 when searching for a movie */
  };

  const handleInputChange = (value: any) => {
    setQuery(value);
    if (value.trim().length === 0) {
      // movieContext?.setEmptyInput(true);
      movieContext?.setUrl(
        "https://api.themoviedb.org/3/movie/upcoming?api_key=13f9b567969342bbfb2322ca39624376&language=en-US"
      );
      return;
      // movieContext?.setMovies(movieContext.cachedMovies);
    }
    searchQuery(value);
    movieContext?.setPage(1);
  };

  const handleSearchSubmission = async (e: any) => {
    e.preventDefault();
    if (!query.length) {
      console.log("0");
      return;
    }
    movieContext?.setPage(1);
    return navigate(`/search/${query}`);
  };

  const handleLogin = () => {
    loginWithRedirect();
    console.log("helllo");
  };
  const handleLogout = () => {
    localStorage.clear();
    logout({ returnTo: window.location.origin });
  };

  const fetchOption = async () => {
    // const response = await axios.get(
    //   `https://api.themoviedb.org/3/movie/${selectedOption}?api_key=13f9b567969342bbfb2322ca39624376&language=en-US&page=${}`
    // );
    // const filteredMovies = response.data.results;
    // console.log(filteredMovies);
    // movieContext?.setMovies(filteredMovies);
    movieContext?.setUrl(
      `https://api.themoviedb.org/3/movie/${selectedOption}?api_key=13f9b567969342bbfb2322ca39624376&language=en-US`
    );
  };

  const handleSelect = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e?.target.value);
    console.log(e.target.value);
  };

  useEffect(() => {
    fetchOption();
    movieContext?.setPage(1);
  }, [selectedOption]);

  return (
    <>
      <Box
        as="nav"
        // bg={useColorModeValue("gray.100", "#201C1C")}
        px={12}
        mt="1rem"
        boxShadow={"lg"}
        // bgColor="red.500"
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Flex alignItems={"center"} gap="6">
            <Heading color="white" fontWeight={"black"} textAlign="center">
              <Link _hover={{ textDecoration: "none" }} href={"/"}>
                Trillin
              </Link>
            </Heading>
            {currentPath == "/" ? (
              <Stack direction={"row"} spacing={3}>
                <Select
                  className="sort-by"
                  color={"white"}
                  textColor="white"
                  borderColor="red"
                  // bgColor={"black"}
                  value={selectedOption}
                  onChange={handleSelect}
                >
                  <option value="upcoming">Upcoming</option>
                  <option value="popular">Popularity</option>
                  <option value="top_rated">Top Rating </option>
                  <option value="now_playing">Now playing</option>
                </Select>
              </Stack>
            ) : null}
          </Flex>
          <Flex className="left-side" alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Flex alignItems={"center"} gap="24">
                <form onSubmit={(e) => handleSearchSubmission(e)}>
                  <Input
                    w="xs"
                    color="whiteAlpha.800"
                    mr="1rem"
                    textAlign={"center"}
                    placeholder="Search movie"
                    padding={"10px 10px 10px 5px"}
                    border="none"
                    borderRadius={0}
                    borderBottom="1px solid white"
                    _focusVisible={{
                      outline: "none",
                      borderBottomColor: "red",
                    }}
                    _hover={{ borderBottomColor: "red" }}
                    value={query}
                    onChange={(e) => handleInputChange(e.target.value)}
                  />

                  <IconButton
                    variant={"outline"}
                    color="red"
                    aria-label="submit button"
                    type="submit"
                    _hover={{ bgColor: "red", borderColor: "red" }}
                  >
                    <SearchIcon
                      // display={{ base: "none" }}
                      className="SearchIcon"
                      color="white"
                    />
                  </IconButton>
                </form>
                {isAuthenticated ? (
                  <Menu>
                    <MenuButton
                      as={Button}
                      rounded={"full"}
                      variant={"link"}
                      cursor={"pointer"}
                      minW={0}
                    >
                      <Avatar
                        size={"sm"}
                        // src={"https://avatars.dicebear.com/api/male/username.svg"}
                      />
                    </MenuButton>
                    <MenuList color="black" alignItems={"center"}>
                      <br />
                      <Center>
                        <Avatar
                          size={"2xl"}
                          // src={"https://avatars.dicebear.com/api/male/username.svg"}
                        />
                      </Center>
                      <br />
                      <Center>
                        <p>{user?.nickname?.toUpperCase()}</p>
                      </Center>
                      <br />
                      <MenuDivider />
                      <MenuItem>
                        <Link href="/favorites"> Your favorites </Link>{" "}
                      </MenuItem>
                      <MenuItem>
                        <Link href="/watch-list"> Your watch list </Link>{" "}
                      </MenuItem>
                      <MenuItem>
                        <Link href="/completed-list">
                          {" "}
                          Your completed list{" "}
                        </Link>{" "}
                      </MenuItem>
                      <MenuItem>
                        <Link onClick={handleLogout}>Logout</Link>{" "}
                      </MenuItem>
                    </MenuList>
                  </Menu>
                ) : (
                  <Box>{}</Box>
                )}
                {!isAuthenticated && !isLoading ? (
                  <Box ml="-12">
                    <Button
                      outlineColor={"red"}
                      bgColor="black"
                      _hover={{
                        bgColor: "red",
                        color: "white",
                        outlineColor: "transparent",
                      }}
                      onClick={handleLogin}
                    >
                      Login
                    </Button>
                  </Box>
                ) : null}
              </Flex>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};
