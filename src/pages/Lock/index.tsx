import type { NextPage } from "next";
import {
  Stack,
  useColorMode,
  useColorModeValue,
  Box,
  Heading,
  Highlight,
} from "@chakra-ui/react";
import Navbar from "../../components/Navbar";

const Lock: NextPage = () => {
  const { toggleColorMode } = useColorMode();

  const bg = useColorModeValue("#8AA2FF", "#001772");
  const buttonBg = useColorModeValue("#388AFF", "#388AFF");

  return (
    <Stack direction="column" gap={10}>
      <Box bg={bg}>
        <Navbar buttonBg={buttonBg} toggleBg={toggleColorMode} />
      </Box>
      <Box textAlign="center">
        <Heading lineHeight="tall">
          <Highlight
            query={["LOCK", "EARN!"]}
            styles={{
              px: "2",
              py: "1",
              rounded: "full",
              bg: "blue.100",
            }}
          >
            LOCK AICOIN TOKENS AND START TO EARN!
          </Highlight>
        </Heading>
      </Box>
    </Stack>
  );
};

export default Lock;
