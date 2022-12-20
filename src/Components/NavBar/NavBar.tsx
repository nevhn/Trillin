import { useState, useContext, ChangeEvent, FormEvent, useEffect } from "react";
import axios from "axios";
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
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  Heading,
  FormControl,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon, SearchIcon } from "@chakra-ui/icons";
import MovieContext from "../../MovieContext/MovieContext";
import { useNavigate, Outlet } from "react-router-dom";

// export const NavLink = ({ children }: { children: ReactNode }) => (
//   <Link
//     px={2}
//     py={1}
//     rounded={"md"}
//     _hover={{
//       textDecoration: "none",
//       bg: useColorModeValue("gray.200", "gray.700"),
//     }}
//     href={"#"}
//   >
//     {children}
//   </Link>
// );

export const NavBar = () => {
  /**
   * Add divider between theme button
   */
  const navigate = useNavigate();

  const movieContext = useContext(MovieContext);

  const [query, setQuery] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const { colorMode, toggleColorMode } = useColorMode();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const searchQuery = async (query: string) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=13f9b567969342bbfb2322ca39624376&language=en-US&page=1&query=${query}&include_adult=false&region=US`
    );
    const listOfMovies = response.data.results;
    movieContext?.setMovies(listOfMovies);
    movieContext?.setEmptyInput(false);
    /**TODO: reset page to 1 when searching for a movie */
    // movieContext?.setPage(1);
  };

  const handleInputChange = (value: any) => {
    console.log(value.trim().length);
    setQuery(value);
    if (value.trim().length === 0) {
      movieContext?.setEmptyInput(true);
      return;
      // movieContext?.setMovies(movieContext.cachedMovies);
    }
    searchQuery(value);
    console.log("!");
  };

  const handleSearchSubmission = async (e: any) => {
    e.preventDefault();
    console.log(query);
    if (!query.length) {
      console.log("0");
      return;
    }
    return navigate(`/search/${query}`);
  };

  const fetchMovies = async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${selectedOption}?api_key=13f9b567969342bbfb2322ca39624376&language=en-US&page=1`
    );
    const filteredMovies = response.data.results;
    console.log(filteredMovies);
    movieContext?.setMovies(filteredMovies);
  };

  const handleSelect = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e?.target.value);
    console.log(e.target.value);
  };

  useEffect(() => {
    fetchMovies();
  }, [selectedOption]);

  return (
    <>
      <Box
        as="nav"
        bg={useColorModeValue("gray.100", "#201C1C")}
        px={10}
        mt="1rem"
        boxShadow={"md"}
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box>
            <Heading
              color={useColorModeValue("gray.800", "white")}
              fontWeight={"black"}
              textAlign="center"
            >
              <Link _hover={{ textDecoration: "none" }} href={"/"}>
                Trillin
              </Link>
            </Heading>
          </Box>

          <Flex alignItems={"center"} gap={24}>
            <Stack direction={"row"} spacing={3}>
              <Select
                defaultValue={"upcoming"}
                value={selectedOption}
                onChange={handleSelect}
              >
                {/* TODO: Figure out what url the main page is calling and set as the default value for the selection menu */}
                <option value="upcoming">Upcoming</option>
                <option value="popular">Popularity</option>
                <option value="top_rated">Top Rating </option>
                <option value="now_playing">Now playing</option>
              </Select>
            </Stack>
            <Box>
              <FormControl onSubmit={(e) => handleSearchSubmission(e)}>
                <Input
                  w={{ base: "xs" }}
                  variant={"outline"}
                  whiteSpace={"nowrap"}
                  bg="gray.200"
                  _placeholder={{ color: "gray.700" }}
                  textAlign={"center"}
                  placeholder="Search movie"
                  onChange={(e) => handleInputChange(e.target.value)}
                  value={query}
                  mr="1rem"
                />

                <IconButton aria-label="submit button" type="submit">
                  <SearchIcon className="SearchIcon" color="gray.5ada00" />
                </IconButton>
              </FormControl>
            </Box>
            {/* <IconButton
                  m="0"
                  colorScheme="blue"
                  aria-label="Search Movies"
                  icon={<SearchIcon />}
                /> */}

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
                  src={"https://avatars.dicebear.com/api/male/username.svg"}
                />
              </MenuButton>
              <MenuList alignItems={"center"}>
                <br />
                <Center>
                  <Avatar
                    size={"2xl"}
                    src={"https://avatars.dicebear.com/api/male/username.svg"}
                  />
                </Center>
                <br />
                <Center>
                  <p>Chris</p>
                </Center>
                <br />
                <MenuDivider />
                <MenuItem>
                  {" "}
                  <Link href="/favorites"> Your favorites </Link>{" "}
                </MenuItem>
                <MenuItem>
                  <Link href="/watch-list"> Your watch list </Link>{" "}
                </MenuItem>
                <MenuItem>
                  <Link href="/completed-list"> Your completed list </Link>{" "}
                </MenuItem>
                <MenuItem>
                  <Link href="/logout"> Logout</Link>{" "}
                </MenuItem>
              </MenuList>
            </Menu>

            <Box ml="-12">
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
            </Box>
          </Flex>
        </Flex>
      </Box>
      <Outlet />
    </>
  );
};
