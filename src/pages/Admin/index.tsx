import type { NextPage } from "next";
import {
  Stack,
  Text,
  Box,
  Heading,
  Highlight,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import Navbar from "../../components/Navbar";
import AdminFunctions from "../../components/AdminFunctions";

const Admin: NextPage = () => {
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
              query={["AICoin Admin"]}
              styles={{
                px: "4",
                py: "1",
                rounded: "full",
                bg: "blue.400",
                color: "#000428",
              }}
            >
              AICoin Admin
            </Highlight>
          </Heading>
          <Text ml={3} mt={3} fontSize="lg" fontWeight="bold">
            This is the route where Team Members can interact with contracts
          </Text>
        </Box>
      </Stack>
      <Box>
        <AdminFunctions />
      </Box>
    </Box>
  );
};

export default Admin;
