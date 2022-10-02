import type { NextPage } from "next";
import {
  Grid,
  Box,
  Text,
  Stack,
  GridItem,
  Input,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import BALLOT_FACTORY from "../../common/BallotFactory.sol/BallotFactory.json";
import { useSelector } from "react-redux";
import { setAddr } from "../../../slices/setAccount";
import { ethers } from "ethers";

const AdminFunctions: NextPage = () => {
  const BALLOT_FACTORY_CONTRACT = "0x7876c31aa81D7eE511556bEC2F81411acd7ffa9A";

  const address = useSelector(setAddr);

  const [value, setValue] = useState({
    address: address,
    optionName: "",
    title: "",
    endDate: 0,
    options: 0,
    startDate: 0,
    ballotIdToSeal: 0,
    ballotIdToClose: 0,
    ballotIdToPutOption: 0,
    optionIdToPutOption: 0,
    createBallotClicked: false,
    sealBallotClicked: false,
    closeBallotClicked: false,
    addTitleToOptionClicked: false,
  });

  const handleChangeTitle = (event: any) =>
    setValue({ ...value, title: event.target.value });

  const handleChangeStartDate = (event: any) =>
    setValue({ ...value, startDate: event.target.value });

  const handleChangeEndDate = (event: any) =>
    setValue({ ...value, endDate: event.target.value });

  const handleChangeOptions = (event: any) =>
    setValue({ ...value, options: event.target.value });

  const handleChangeSealBallotID = (event: any) =>
    setValue({ ...value, ballotIdToSeal: event.target.value });

  const handleChangeCloseBallotID = (event: any) =>
    setValue({ ...value, ballotIdToClose: event.target.value });

  const handleChangeOptionBallotID = (event: any) =>
    setValue({ ...value, ballotIdToPutOption: event.target.value });

  const handleChangeOptionID = (event: any) =>
    setValue({ ...value, optionIdToPutOption: event.target.value });

  const handleChangeOptionName = (event: any) =>
    setValue({ ...value, optionName: event.target.value });

  const createBallot = async () => {
    const ethereum = (window as any).ethereum;
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    const provider = new ethers.providers.Web3Provider(ethereum);
    const walletAddress = accounts[0];
    const signer = provider.getSigner(walletAddress);

    const contract = new ethers.Contract(
      BALLOT_FACTORY_CONTRACT,
      BALLOT_FACTORY.abi,
      signer
    );

    const tx = await contract.createBallot(
      value.title,
      value.startDate,
      value.endDate,
      value.options
    );

    console.log(tx);

    setValue({ ...value, createBallotClicked: false });
  };

  const addTitleToBallot = async () => {
    const ethereum = (window as any).ethereum;
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    const provider = new ethers.providers.Web3Provider(ethereum);
    const walletAddress = accounts[0];
    const signer = provider.getSigner(walletAddress);

    const contract = new ethers.Contract(
      BALLOT_FACTORY_CONTRACT,
      BALLOT_FACTORY.abi,
      signer
    );

    const tx = await contract.addTitleToOption(
      value.ballotIdToPutOption,
      value.optionIdToPutOption,
      value.optionName
    );

    console.log(tx);

    setValue({ ...value, addTitleToOptionClicked: false });
  };

  const sealBallot = async () => {
    const ethereum = (window as any).ethereum;
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    const provider = new ethers.providers.Web3Provider(ethereum);
    const walletAddress = accounts[0];
    const signer = provider.getSigner(walletAddress);

    const contract = new ethers.Contract(
      BALLOT_FACTORY_CONTRACT,
      BALLOT_FACTORY.abi,
      signer
    );

    const tx = await contract.sealABallot(value.ballotIdToSeal);

    console.log(tx);

    setValue({ ...value, createBallotClicked: false });
  };

  const closeBallot = async () => {
    const ethereum = (window as any).ethereum;
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    const provider = new ethers.providers.Web3Provider(ethereum);
    const walletAddress = accounts[0];
    const signer = provider.getSigner(walletAddress);

    const contract = new ethers.Contract(
      BALLOT_FACTORY_CONTRACT,
      BALLOT_FACTORY.abi,
      signer
    );

    const tx = await contract.closeABallot(value.ballotIdToClose);

    console.log(tx);

    setValue({ ...value, closeBallotClicked: false });
  };

  return (
    <Stack direction="column">
      <Grid
        templateColumns="repeat(3, 10fr)"
        gap={8}
        maxWidth="60%"
        pt={10}
        ml="auto"
        mr="auto"
      >
        <GridItem
          bg="#092B7E"
          rounded={40}
          width="100%"
          pl={10}
          pr={10}
          pb={10}
          pt={5}
        >
          <Box>
            <Text
              fontFamily="Quicksand"
              textAlign="center"
              fontWeight="bold"
              fontSize="2xl"
            >
              Create a new Ballot
            </Text>
            <Text mb="4px" mt="4px">
              Title
            </Text>
            <Input
              value={value.title}
              onChange={handleChangeTitle}
              placeholder="AICoin has to burn 5000 Tokens"
              size="sm"
              rounded="10px"
            />
            <Text mb="4px" mt="4px">
              Start Date
            </Text>
            <Input
              value={value.startDate}
              type="number"
              onChange={handleChangeStartDate}
              size="sm"
              rounded="10px"
            />
            <Text mb="4px" mt="4px">
              End Date
            </Text>
            <Input
              value={value.endDate}
              type="number"
              onChange={handleChangeEndDate}
              size="sm"
              rounded="10px"
            />
            <Text mb="4px" mt="4px">
              Number of Options
            </Text>
            <Input
              value={value.options}
              type="number"
              onChange={handleChangeOptions}
              size="sm"
              rounded="10px"
            />
          </Box>
          {value.createBallotClicked ? (
            <Button
              isLoading
              loadingText="Creating..."
              colorScheme="blue"
              variant="outline"
              mt={8}
              ml="25%"
            >
              Create Ballot
            </Button>
          ) : (
            <Button
              colorScheme="blue"
              variant="outline"
              mt={8}
              ml="25%"
              onClick={() => {
                setValue({ ...value, createBallotClicked: true });
                createBallot();
              }}
            >
              Create Ballot
            </Button>
          )}
        </GridItem>
        <GridItem
          bg="#092B7E"
          maxH="100%"
          rounded={40}
          width="100%"
          pl={10}
          pr={10}
          pb={10}
          pt={5}
        >
          <Text
            fontFamily="Quicksand"
            textAlign="center"
            fontWeight="bold"
            fontSize="2xl"
          >
            Add Name to Option
          </Text>
          <Text mb="4px" mt="6px">
            Ballot ID
          </Text>
          <Input
            value={value.ballotIdToPutOption}
            type="number"
            onChange={handleChangeOptionBallotID}
            size="sm"
            rounded="10px"
          />
          <Text mb="4px" mt="6px">
            Option ID
          </Text>
          <Input
            value={value.optionIdToPutOption}
            type="number"
            max={7}
            onChange={handleChangeOptionID}
            size="sm"
            rounded="10px"
          />
          <Text mb="10px" mt="6px">
            Option Description
          </Text>
          <Input
            value={value.optionName}
            type="text"
            onChange={handleChangeOptionName}
            size="sm"
            rounded="10px"
          />
          {value.addTitleToOptionClicked ? (
            <Button
              isLoading
              loadingText="Adding..."
              colorScheme="blue"
              variant="outline"
              mt={20}
              ml="25%"
            >
              Add Title
            </Button>
          ) : (
            <Button
              colorScheme="blue"
              variant="outline"
              mt={20}
              ml="25%"
              onClick={() => {
                setValue({ ...value, addTitleToOptionClicked: true });
                addTitleToBallot();
              }}
            >
              Add Title
            </Button>
          )}
        </GridItem>
        <GridItem
          bg="#092B7E"
          maxH="100%"
          rounded={40}
          width="100%"
          pl={10}
          pr={10}
          pb={10}
          pt={5}
        >
          <Box>
            <Text
              fontFamily="Quicksand"
              textAlign="center"
              fontWeight="bold"
              fontSize="2xl"
            >
              Seal a Ballot
            </Text>
            <Text mb="4px" mt="4px">
              Ballot ID
            </Text>
            <Input
              value={value.ballotIdToSeal}
              type="number"
              onChange={handleChangeSealBallotID}
              size="sm"
              rounded="10px"
            />
            {value.sealBallotClicked ? (
              <Button
                isLoading
                loadingText="Sealing..."
                colorScheme="blue"
                variant="outline"
                mt={4}
                ml="30%"
              >
                Seal Ballot
              </Button>
            ) : (
              <Button
                colorScheme="blue"
                variant="outline"
                mt={4}
                ml="30%"
                onClick={() => {
                  setValue({ ...value, sealBallotClicked: true });
                  sealBallot();
                }}
              >
                Seal Ballot
              </Button>
            )}
            <Text
              fontFamily="Quicksand"
              textAlign="center"
              fontWeight="bold"
              fontSize="2xl"
              mt={8}
            >
              Close a Ballot
            </Text>
            <Text mb="4px" mt="4px">
              Ballot ID
            </Text>
            <Input
              value={value.ballotIdToClose}
              type="number"
              onChange={handleChangeCloseBallotID}
              size="sm"
              rounded="10px"
            />
            {value.closeBallotClicked ? (
              <Button
                isLoading
                loadingText="Closing..."
                colorScheme="blue"
                variant="outline"
                mt={4}
                ml="30%"
              >
                Close Ballot
              </Button>
            ) : (
              <Button
                colorScheme="blue"
                variant="outline"
                mt={7}
                ml="30%"
                onClick={() => {
                  setValue({ ...value, closeBallotClicked: true });
                  closeBallot();
                }}
              >
                Close Ballot
              </Button>
            )}
          </Box>
        </GridItem>
      </Grid>
    </Stack>
  );
};

export default AdminFunctions;
