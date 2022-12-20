import {
  Box,
  Flex,
  Heading,
  Link,
  Button,
  FormControl,
  FormLabel,
  Input,
  useColorMode,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import { MdSearch } from "react-icons/md";

export const NavBar2: React.FC = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onToggle } = useDisclosure();
  const toast = useToast();

  const handleSearch = (event: any) => {
    event.preventDefault();
    toast({
      title: "Search submitted.",
      description: "Your search has been submitted.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg={colorMode === "light" ? "gray.800" : "gray.100"}
      color={colorMode === "light" ? "gray.100" : "gray.800"}
      boxShadow="md"
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg">
          My App
        </Heading>
      </Flex>

      <Box display={{ base: "block", md: "none" }} onClick={onToggle}>
        <FiMenu size="24px" />
      </Box>

      <Box
        display={{ base: isOpen ? "block" : "none", md: "flex" }}
        width={{ base: "full", md: "auto" }}
        alignItems="center"
        flexGrow={1}
        mt={{ base: 4, md: 0 }}
      >
        <FormControl onSubmit={(e) => handleSearch(e)}>
          <FormLabel htmlFor="search-input">Search</FormLabel>
          <Input
            id="search-input"
            placeholder="Enter a search term..."
            type="text"
          />
          <Button leftIcon={<MdSearch />} variant="outline" />
        </FormControl>
      </Box>

      <Box
        display={{ base: isOpen ? "block" : "none", md: "flex" }}
        alignItems="center"
        mt={{ base: 4, md: 0 }}
      >
        <Link mr={6} color="inherit" fontWeight="bold" href="#">
          Home
        </Link>
        <Link mr={6} color="inherit" fontWeight="bold" href="#">
          About
        </Link>
        <Link mr={6} color="inherit" fontWeight="bold" href="#">
          Contact
        </Link>
      </Box>
    </Flex>
  );
};
