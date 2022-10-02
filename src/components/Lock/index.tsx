import {
  Box,
  Text,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Spinner,
  Button,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Stack,
} from "@chakra-ui/react";
import LOCK_ABI from "../../common/Token.sol/Token.json";
import { useEffect, useState } from "react";
import { ethers } from "ethers";

const LockComponent = (props: any) => {
  const LOCK_CONTRACT = "0x55bf8746cCf6E88298502edb38CBa41a6D5C6651";

  const format = (val: any) => `Ξ ` + val;
  const parse = (val: any) => val.replace(/^\$/, "");

  const [value, setValue] = useState(100);
  const [clicked, setClicked] = useState({
    lock: false,
    unlock: false,
  });
  const [locked, setLocked] = useState("0");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const ethereum = (window as any).ethereum;
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    const provider = new ethers.providers.Web3Provider(ethereum);
    const walletAddress = accounts[0];
    const signer = provider.getSigner(walletAddress);
    const contract = new ethers.Contract(LOCK_CONTRACT, LOCK_ABI.abi, signer);
    const value = (await contract.tokensUsedLock(walletAddress)) / 10 ** 8;
    setLocked(value.toString());
  };

  const lockTokens = async () => {
    setClicked({
      lock: true,
      unlock: false,
    });
    const ethereum = (window as any).ethereum;
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    const provider = new ethers.providers.Web3Provider(ethereum);
    const walletAddress = accounts[0];
    const signer = provider.getSigner(walletAddress);
    const contract = new ethers.Contract(LOCK_CONTRACT, LOCK_ABI.abi, signer);
    const tx = await contract.lockTokens(value * 10 ** 8);
    setClicked({
      lock: false,
      unlock: false,
    });
    const receipt = await tx.wait();
    console.log(receipt.status);
  };

  const unLockTokens = async () => {
    setClicked({
      lock: false,
      unlock: true,
    });
    const ethereum = (window as any).ethereum;
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    const provider = new ethers.providers.Web3Provider(ethereum);
    const walletAddress = accounts[0];
    const signer = provider.getSigner(walletAddress);
    const contract = new ethers.Contract(LOCK_CONTRACT, LOCK_ABI.abi, signer);
    const tx = await contract.unlockTokens(value * 10 ** 8);
    setClicked({
      lock: false,
      unlock: false,
    });
    const receipt = await tx.wait();
    console.log(receipt.status);
  };

  return (
    <Accordion allowMultiple maxW="65%" ml="auto" mr="auto" mt={10}>
      <AccordionItem rounded={40}>
        <h2>
          <AccordionButton p={5} rounded={40}>
            <Box flex="1" textAlign="left">
              <Stack direction="row" gap={32}>
                <Text fontWeight="bold" color="blue.100" fontSize="2xl">
                  Lock/Unlock XAI
                </Text>
                <Text fontWeight="bold" color="blue.300" fontSize="md">
                  Your XAI Locked:
                  <Text>{locked}</Text>
                </Text>
                <Text fontWeight="bold" color="blue.600" fontSize="md">
                  Total XAI Locked:
                  <Text>{props.totalLocked}</Text>
                </Text>
                <Text fontWeight="bold" color="blue.400" fontSize="md">
                  APY
                  <Text>14.78%</Text>
                </Text>
              </Stack>
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel p={8} bg="gray.900" rounded={20}>
          <Stack direction="row" gap={20}>
            <NumberInput
              maxW="30%"
              onChange={(valueString) => setValue(parse(valueString))}
              value={format(value)}
              defaultValue={100}
              precision={0}
              step={1}
              min={0}
              allowMouseWheel
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Button
              pb={3}
              pt={3}
              m={0}
              pl={0}
              pr={5}
              bg={props.buttonBg}
              rounded={20}
              color="white"
              onClick={lockTokens}
            >
              {clicked.lock == false ? (
                <Text fontWeight="bold" ml={4}>
                  Lock Tokens
                </Text>
              ) : (
                <Spinner
                  ml={5}
                  thickness="6px"
                  speed="0.5s"
                  emptyColor="white"
                  color="blue.700"
                  size="md"
                />
              )}
            </Button>
            <Button
              pb={3}
              pt={3}
              m={0}
              pl={0}
              pr={5}
              bg={props.buttonBg}
              rounded={20}
              color="white"
              onClick={unLockTokens}
            >
              {clicked.unlock == false ? (
                <Text fontWeight="bold" ml={4}>
                  Unlock Tokens
                </Text>
              ) : (
                <Spinner
                  ml={5}
                  thickness="6px"
                  speed="0.5s"
                  emptyColor="white"
                  color="blue.700"
                  size="md"
                />
              )}
            </Button>
          </Stack>
        </AccordionPanel>
      </AccordionItem>

      {/* <AccordionItem>
        <h2>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              Section 2 title
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </AccordionPanel>
      </AccordionItem> */}
    </Accordion>

    // <Box bg={props.bg} w="30%" ml="auto" mr="auto" mt={10} p={10} rounded={35}>
    //   <Text
    //     textAlign="center"
    //     mb={3}
    //     fontFamily="Quicksand"
    //     fontWeight="extrabold"
    //     fontSize="3xl"
    //   >
    //     AMOUNT TO LOCK
    //   </Text>
    //   <NumberInput
    //     onChange={(valueString) => setValue(parse(valueString))}
    //     value={format(value)}
    //     defaultValue={100}
    //     precision={0}
    //     step={1}
    //     min={0}
    //     allowMouseWheel
    //   >
    //     <NumberInputField />
    //     <NumberInputStepper>
    //       <NumberIncrementStepper />
    //       <NumberDecrementStepper />
    //     </NumberInputStepper>
    //   </NumberInput>
    //   <Box alignContent="center" textAlign="center" alignSelf="center" mt={5}>
    //     <Button
    //       pb={3}
    //       pt={3}
    //       m={0}
    //       pl={0}
    //       pr={5}
    //       bg={props.buttonBg}
    //       rounded={20}
    //       color="white"
    //       onClick={lockTokens}
    //     >
    //       {clicked == false ? (
    //         <Text fontWeight="bold" ml={4}>
    //           Lock Tokens
    //         </Text>
    //       ) : (
    //         <Spinner
    //           ml={5}
    //           thickness="6px"
    //           speed="0.5s"
    //           emptyColor="white"
    //           color="blue.700"
    //           size="md"
    //         />
    //       )}
    //     </Button>
    //   </Box>
    // </Box>
  );
};

export default LockComponent;
