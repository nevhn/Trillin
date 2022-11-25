import { useState, useContext } from "react";
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
  Text,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon, SearchIcon } from "@chakra-ui/icons";
import MovieContext from "../../MovieContext/MovieContext";

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
  const movieContext = useContext(MovieContext);
  const movies = movieContext?.movies as any[];

  const [query, setQuery] = useState(undefined);

  const { colorMode, toggleColorMode } = useColorMode();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const searchQuery = async (query: string) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=13f9b567969342bbfb2322ca39624376&language=en-US&page=1&query=${query}&include_adult=false&region=US`
    );
    const movies = response.data.results;
    movieContext?.setMovies(movies);
  };

  const handleInputChange = (e: any) => {
    /**TODO: Figure out how to reset homepage when search query is clear. Prehaps using context */
    setQuery(e.target.value);
    console.log(e.target.value);

    if (!e.target.value) {
      console.log(query);
      movieContext?.setMovies(movies);
    } else {
      searchQuery(e.target.value);
    }
  };

  return (
    <>
      <Box
        bg={useColorModeValue("gray.100", "#201C1C")}
        px={10}
        mt="1rem"
        boxShadow={"md"}
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-around"}>
          <Heading
            color={useColorModeValue("gray.800", "white")}
            fontWeight={"black"}
          >
            <Link _hover={{ textDecoration: "none" }} href={"/"}>
              Trillin
            </Link>
          </Heading>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Select placeholder="Filter by">
                <option value="option1">Popularity</option>
                <option value="option2">Average Rating </option>
                <option value="option3">Release Date</option>
                <option value="option3">Top grossing </option>
              </Select>

              <Flex className="search" gap={"1"}>
                <InputGroup>
                  <InputRightElement
                    className="InputLeft"
                    pointerEvents="none"
                    children={
                      <SearchIcon className="SearchIcon" color="gray.5ada00" />
                    }
                  />
                  <Input
                    w="sm"
                    variant={"outline"}
                    whiteSpace={"nowrap"}
                    bg="gray.200"
                    _placeholder={{ color: "gray.700" }}
                    textAlign={"center"}
                    placeholder="Search movie"
                    onChange={handleInputChange}
                    value={query}
                  />
                </InputGroup>
                {/* <IconButton
                  m="0"
                  colorScheme="blue"
                  aria-label="Search Movies"
                  icon={<SearchIcon />}
                /> */}
              </Flex>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
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
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
};
