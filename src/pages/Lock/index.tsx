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
import LockComponent from "../../components/Lock";
import { useEffect, useState } from "react";
import LOCK_ABI from "../../common/Token.sol/Token.json";
import { MetaMaskInpageProvider } from "@metamask/providers";
import Web3 from "web3";
import { AbiItem } from "web3-utils";

// declare global {
//   interface Window {
//     ethereum: MetaMaskInpageProvider;
//   }
// }

const Lock = () => {
  const LOCK_CONTRACT = "0xd6f173F63c200996aADf61Fb92F0795CCDDc8229";
  const RPC_ENDPOINT = "https://goerli.etherscan.io/";
  const [value, setValue] = useState("506");
  const { toggleColorMode } = useColorMode();
  const bg = useColorModeValue("#8AA2FF", "#001772");
  const buttonBg = useColorModeValue("#388AFF", "#388AFF");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let web3 = new Web3(RPC_ENDPOINT);
    const contract = new web3.eth.Contract(
      LOCK_ABI.abi as AbiItem[],
      LOCK_CONTRACT
    );
    const tokens = await contract.methods.totalLockedTokens.call();
    console.log(await tokens);
  };

  return (
    <Box>
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
            <Text color="blue.300">Total Value Locked (TVL)</Text>
            <Text>{value} XAI</Text>
          </Heading>
        </Box>
      </Stack>
      <LockComponent buttonBg={buttonBg} bg={bg} />
    </Box>
  );
};

export default Lock;
