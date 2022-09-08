import type { NextPage } from "next";
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

const LockComponent = (props: any) => {
  const format = (val: any) => `Ξ ` + val;
  const parse = (val: any) => val.replace(/^\$/, "");

  const [value, setValue] = useState("120.50");
  const [clicked, setClicked] = useState(false);

  function lockTokens() {
    console.log(value);
  }

  return (
    <Box bg={props.bg} w="30%" ml="auto" mr="auto" mt={10} p={10} rounded={35}>
      <Text
        textAlign="center"
        mb={3}
        fontFamily="Quicksand"
        fontWeight="extrabold"
        fontSize="2xl"
      >
        AMOUNT
      </Text>
      <NumberInput
        onChange={(valueString) => setValue(parse(valueString))}
        value={format(value)}
        defaultValue={100}
        precision={2}
        step={0.01}
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

export default LockComponent;
