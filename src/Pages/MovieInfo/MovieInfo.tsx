import React from "react";
import {
  Container,
  Box,
  Img,
  AspectRatio,
  Flex,
  Grid,
  Text,
  Heading,
} from "@chakra-ui/react";

export const MovieInfo = () => {
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
          src="https://www.youtube.com/embed/13nSISwxrY4"
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
          <Heading color="#2891FC">Neon Genesis Evangelion</Heading>
          <Heading as="h3" size="1xl">
            October 4, 1995
          </Heading>
          <Text as="span">
            A teenage boy finds himself recruited as a member of an elite team
            of pilots by his father.
          </Text>

          {/* Date released/ Upcoming */}
        </Box>

        <Box>
          {/* Rating */}
          <Heading>Rating : R</Heading>

          {/* Directors & Writers */}
          <Text fontWeight={"bold"} as="span">
            Creator{" "}
          </Text>
          <Text as="span">Hideaki Anno</Text>
          <br />

          {/* Genre*/}

          <Text fontWeight={"bold"} as="span">
            Genre{" "}
          </Text>
          <Text as="span">M</Text>
          <br />
          {/* Run Time*/}
          <Text fontWeight={"bold"} as="span">
            Run Time{" "}
          </Text>
          <Text as="span">2 hours</Text>
          {"\n"}
        </Box>
      </Flex>
    </Box>
  );
};
