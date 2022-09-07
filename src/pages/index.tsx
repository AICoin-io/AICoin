import type { NextPage } from "next";
import {
  Flex,
  Box,
  Stack,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import Content from "../components/Content";
import Navbar from "../components/Navbar";

const Home: NextPage = () => {
  const { toggleColorMode } = useColorMode();

  const bg = useColorModeValue("#8AA2FF", "#001772");
  const buttonBg = useColorModeValue("#388AFF", "#388AFF");

  return (
    <div>
      <Flex>
        <Stack direction="column" spacing={20} w="100%">
          <Box bg={bg}>
            <Navbar buttonBg={buttonBg} toggleBg={toggleColorMode} />
          </Box>
          <Box alignSelf="center">
            <Content />
          </Box>
        </Stack>
      </Flex>
    </div>
  );
};

export default Home;
