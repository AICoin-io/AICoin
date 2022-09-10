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
import LockComponent from "../../components/Lock";
import { useEffect, useState } from "react";
import LOCK_ABI from "../../common/Token.sol/Token.json";
import { ethers } from "ethers";
import UnLockComponent from "../../components/Unlock";

const Lock = () => {
  const LOCK_CONTRACT = "0xd6f173F63c200996aADf61Fb92F0795CCDDc8229";

  // ADD API KEY
  const RPC_ENDPOINT = "https://goerli.infura.io/v3/";

  const [value, setValue] = useState("***");
  const { toggleColorMode } = useColorMode();
  const bg = useColorModeValue("#8AA2FF", "#001772");
  const buttonBg = useColorModeValue("#388AFF", "#388AFF");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const provider = new ethers.providers.JsonRpcProvider(RPC_ENDPOINT);
    const contract = new ethers.Contract(LOCK_CONTRACT, LOCK_ABI.abi, provider);
    const value = (await contract.totalLockedTokens()) / 10 ** 8;
    setValue(value.toString());
  };

  return (
    <Box>
      <Stack direction="column">
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
              query={["Panxora Pools"]}
              styles={{
                px: "4",
                py: "1",
                rounded: "full",
                bg: "blue.400",
                color: "#000428",
              }}
            >
              Panxora Pools
            </Highlight>
          </Heading>
          <Text ml={3} mt={3} fontSize="lg" fontWeight="bold">
            Just lock some tokens to earn. High APR, low risk.
          </Text>
        </Box>
      </Stack>
      <LockComponent buttonBg={buttonBg} bg={bg} totalLocked={value} />
      {/* <UnLockComponent buttonBg={buttonBg} bg={bg} /> */}
    </Box>
  );
};

export default Lock;
