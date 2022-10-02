import type { NextPage } from "next";
import { Grid, GridItem, Text, Highlight, Stack, Box } from "@chakra-ui/react";
import { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { setAddr } from "../../../slices/setAccount";
import BALLOT_FACTORY from "../../common/BallotFactory.sol/BallotFactory.json";
import BALLOT from "../../common/Ballot.sol/Ballot.json";
import { ethers } from "ethers";

const BallotClosedCards: NextPage = () => {
  const BALLOT_FACTORY_CONTRACT = "0x7876c31aa81D7eE511556bEC2F81411acd7ffa9A";

  const address = useSelector(setAddr);

  const [data, setData] = useState({
    address: address,
    ballots: [],
    render: 0,
  });

  const getData = useCallback(async () => {
    let render = 0;
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

    let count = (await contract.ballotCount()) - 1;

    let ballotsArr: any = [];

    const ballotsData = async () => {
      for (let i = 0; i <= count; i++) {
        let arr: any = [];

        let obj = {
          address: "",
          title: "",
          options: [] as any,
          endDate: "",
          totalVotes: 0,
          isSealed: false,
          isClosed: false,
          optionWinner: "",
        };

        obj.title = (await contract.getBallot(i)).title;

        var timestamp =
          parseInt((await contract.getBallot(i)).dateToEnd.toString()) * 1000;

        var date = new Date(timestamp);

        obj.endDate = date.toLocaleString();

        let ballotAddress = await contract.ballots(i);

        obj.address = ballotAddress;

        let ballotContract = new ethers.Contract(
          ballotAddress,
          BALLOT.abi,
          signer
        );

        let options = await ballotContract.options();

        obj.totalVotes = (await ballotContract.totalVotes()).toString();

        obj.isSealed = await ballotContract.isSealed();

        obj.isClosed = await ballotContract.isClosed();

        if (obj.isClosed) render++;

        let numberOfOptionWinner = await ballotContract.optionWinner();

        obj.optionWinner = await ballotContract.optionName(
          numberOfOptionWinner
        );

        for (let j = 0; j <= options; j++) {
          arr.push(await ballotContract.optionName(j));
        }

        obj.options = arr;

        ballotsArr.push(obj);
      }
    };

    await ballotsData();

    setData({
      address: address,
      ballots: ballotsArr,
      render: render,
    });
  }, [address]);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <Stack alignItems="center" mb={10}>
      <Box bg="#05153F" p={4} rounded={20}>
        <Text fontSize="2xl" fontFamily="Quicksand" fontWeight="light">
          Closed Ballots
        </Text>
      </Box>
      <Grid
        templateColumns={
          data.render < 2
            ? "repeat(1, 4fr)"
            : data.render > 2
            ? "repeat(3, 10fr)"
            : "repeat(2, 10fr)"
        }
        gap={8}
        maxWidth="100%"
        pt={10}
        ml="auto"
        mr="auto"
      >
        {data.ballots.map((value: any, i: any) => {
          if (value.isSealed == true && value.isClosed == true) {
            return (
              <GridItem key={i} w="100%" bg="#092B7E" rounded={40} pb={4}>
                <Text
                  textAlign="center"
                  m={5}
                  fontFamily="Quicksand"
                  fontWeight="bold"
                  fontSize="2xl"
                >
                  <Highlight
                    query={value.title}
                    styles={{
                      px: "3",
                      py: "3",
                      rounded: "2xl",
                      bg: "#07205F",
                      color: "white",
                    }}
                  >
                    {value.title}
                  </Highlight>
                </Text>

                <Text
                  textAlign="center"
                  fontFamily="Quicksand"
                  fontWeight="light"
                  fontSize="lg"
                >
                  Winner Option
                </Text>

                <Text
                  textAlign="center"
                  m={5}
                  fontFamily="Quicksand"
                  fontWeight="bold"
                  fontSize="3xl"
                  mb={8}
                >
                  <Highlight
                    query={value.optionWinner}
                    styles={{
                      px: "3",
                      py: "3",
                      rounded: "2xl",
                      bg: "blue.300",
                      color: "white",
                    }}
                  >
                    {value.optionWinner}
                  </Highlight>
                </Text>

                <Text
                  textAlign="center"
                  mt={2}
                  fontFamily="Quicksand"
                  fontWeight="bold"
                >
                  Total Votes: {value.totalVotes}{" "}
                </Text>
              </GridItem>
            );
          }
        })}
      </Grid>
    </Stack>
  );
};

export default BallotClosedCards;
