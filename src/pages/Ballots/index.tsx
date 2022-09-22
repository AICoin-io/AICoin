import type { NextPage } from "next";
import {
  Stack,
  useColorMode,
  useColorModeValue,
  Box,
  Heading,
  Highlight,
  Text,
} from "@chakra-ui/react";
import Navbar from "../../components/Navbar";
import BallotCards from "../../components/BallotCards";

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
          p={10}
          pl={80}
          textAlign="left"
          bg="linear-gradient(to right, #000428, #004e92);"
        >
          <Heading lineHeight="tall">
            <Highlight
              query={["AICoin Ballots"]}
              styles={{
                px: "4",
                py: "1",
                rounded: "full",
                bg: "blue.400",
                color: "#000428",
              }}
            >
              AICoin Ballots
            </Highlight>
          </Heading>
          <Text ml={3} mt={3} fontSize="lg" fontWeight="bold">
            Have your say in the future of the AICoin Ecosystem
          </Text>
        </Box>
      </Stack>
      <Box>
        <BallotCards />
      </Box>
    </Box>
  );
};

export default Ballots;
