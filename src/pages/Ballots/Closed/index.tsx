import type { NextPage } from "next";
import {
  Stack,
  useColorMode,
  useColorModeValue,
  Box,
  Heading,
  Highlight,
  Text,
  Button,
  Link,
} from "@chakra-ui/react";
import NextLink from "next/link";
import Navbar from "../../../components/Navbar";
import { ArrowBackIcon } from "@chakra-ui/icons";
import BallotClosedCards from "../../../components/BallotClosedCards";

const Ballots: NextPage = () => {
  const { toggleColorMode } = useColorMode();

  const bg = useColorModeValue("#8AA2FF", "#001772");
  const buttonBg = useColorModeValue("#388AFF", "#388AFF");

  return (
    <Box>
      <Stack direction="column" mb={10}>
        <Box bg={bg} m={0} p={0}>
          <Navbar buttonBg={buttonBg} toggleBg={toggleColorMode} />
        </Box>
        <Box
          style={{ marginTop: 0 }}
          p={8}
          pl={80}
          textAlign="left"
          bg="linear-gradient(to right, #000428, #004e92);"
        >
          <Heading lineHeight="tall">
            <Highlight
              query={["AICoin Closed Ballots"]}
              styles={{
                px: "4",
                py: "1",
                rounded: "full",
                bg: "blue.400",
                color: "#000428",
              }}
            >
              AICoin Closed Ballots
            </Highlight>
          </Heading>
          <Text ml={3} mt={3} fontSize="lg" fontWeight="bold">
            Review closed Ballots and Discover which option won!
          </Text>
          <Button
            leftIcon={<ArrowBackIcon />}
            colorScheme="blue"
            variant="outline"
            mt={5}
            ml={3}
            rounded={20}
          >
            <NextLink href="/Ballots" passHref>
              Open Ballots
            </NextLink>
          </Button>
        </Box>
      </Stack>
      <Box>
        <BallotClosedCards />
      </Box>
    </Box>
  );
};

export default Ballots;
