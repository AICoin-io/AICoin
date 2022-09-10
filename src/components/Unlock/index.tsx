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
} from "@chakra-ui/react";
import { useState } from "react";
import { ethers } from "ethers";
import LOCK_ABI from "../../common/Token.sol/Token.json";

const UnLockComponent = (props: any) => {
  const LOCK_CONTRACT = "0xd6f173F63c200996aADf61Fb92F0795CCDDc8229";

  const format = (val: any) => `Ξ ` + val;
  const parse = (val: any) => val.replace(/^\$/, "");

  const [value, setValue] = useState(100);
  const [clicked, setClicked] = useState(false);

  const lockTokens = async () => {
    setClicked(true);
    const ethereum = (window as any).ethereum;
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    const provider = new ethers.providers.Web3Provider(ethereum);
    const walletAddress = accounts[0];
    const signer = provider.getSigner(walletAddress);
    const contract = new ethers.Contract(LOCK_CONTRACT, LOCK_ABI.abi, signer);
    const tx = await contract.lockTokens(value * 10 ** 8);
    setClicked(false);
    const receipt = await tx.wait();
    console.log(receipt.status);
  };

  return (
    <Box bg={props.bg} w="30%" ml="auto" mr="auto" mt={10} p={10} rounded={35}>
      <Text
        textAlign="center"
        mb={3}
        fontFamily="Quicksand"
        fontWeight="extrabold"
        fontSize="3xl"
      >
        AMOUNT TO LOCK
      </Text>
      <NumberInput
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
      <Box alignContent="center" textAlign="center" alignSelf="center" mt={5}>
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
          {clicked == false ? (
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
      </Box>
    </Box>
  );
};

export default UnLockComponent;
