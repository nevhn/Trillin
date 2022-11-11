// import { ReactNode } from "react";
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
  Select,
  Heading,
  Text,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon, SearchIcon } from "@chakra-ui/icons";

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
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Box
        bg={useColorModeValue("gray.100", "#201C1C")}
        px={10}
        mt="1rem"
        boxShadow={"md"}
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Heading
            color={useColorModeValue("gray.800", "white")}
            fontWeight={"black"}
          >
            <Link href={"/"}>Trillin</Link>
          </Heading>

          <Flex ml={"auto"} gap={2} w={"md"} mr={5}>
            <Input
              bg="gray.200"
              _placeholder={{ color: "gray.700" }}
              textAlign={"center"}
              placeholder="Search movie"
            />
            <IconButton
              colorScheme="blue"
              aria-label="Search Movies"
              icon={<SearchIcon />}
            />
          </Flex>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Select placeholder="Filter by">
                <option value="option1">Popularity</option>
                <option value="option2">Average Rating </option>
                <option value="option3">Release Date</option>
                <option value="option3">Top grossing </option>
              </Select>

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
