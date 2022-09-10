import {
  Box,
  Stack,
  Button,
  Text,
  Switch,
  Heading,
  Highlight,
  Spinner,
  Link,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import Image from "next/image";
import detectEthereumProvider from "@metamask/detect-provider";
import { MetaMaskInpageProvider } from "@metamask/providers";
import NextLink from "next/link";

const Navbar = (props: any) => {
  const [isLight, setLight] = useState(false);
  const [data, setData] = useState({
    address: "Connect Wallet",
    chainID: "",
    isID: false,
    isConnected: false,
  });
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    let chainId = (window.ethereum as MetaMaskInpageProvider).networkVersion;

    if (chainId == "5") {
      setData({
        address: `${data.address}`,
        chainID: `${
          (window.ethereum as MetaMaskInpageProvider).networkVersion
        }`,
        isID: true,
        isConnected: data.isConnected,
      });
    }
  }, [data.address, data.isConnected]);

  const connectWallet = async () => {
    if (data.isConnected == false) {
      setClicked(true);
      const accounts = await (
        window.ethereum as MetaMaskInpageProvider
      ).request<string[]>({
        method: "eth_requestAccounts",
      });

      if (accounts) {
        if ((window.ethereum as MetaMaskInpageProvider).networkVersion == "5") {
          const address = accounts[0];
          const truncated = `0x...${address?.slice(38, 42).toUpperCase()}`;
          setData({
            address: `${truncated}`,
            chainID: "5",
            isID: true,
            isConnected: true,
          });
        } else {
          const address = accounts[0];
          const truncated = `0x...${address?.slice(38, 42).toUpperCase()}`;
          setData({
            address: `${truncated}`,
            chainID: `${
              (window.ethereum as MetaMaskInpageProvider).networkVersion
            }`,
            isID: false,
            isConnected: true,
          });
        }
      }
      setClicked(false);
    }
  };

  const toggleBackground = () => {
    setLight(!isLight);
    props.toggleBg();
  };

  return (
    <Stack direction="row" mt={3} mb={3} justifyContent="right" gap={5} mr={7}>
      <Stack alignSelf="center" mr="auto" ml={4} direction="row">
        <Box>
          {isLight == true ? (
            <Image src="/brainLight.svg" width={40} height={40} alt="" />
          ) : (
            <Image src="/brainDark.svg" width={40} height={40} alt="" />
          )}
        </Box>
        <Heading
          lineHeight="tall"
          fontFamily="'Quicksand', sans-serif"
          fontWeight="bold"
          fontSize={26}
        >
          <Highlight
            query={["AI"]}
            styles={{ px: "2", py: "1", rounded: "xl", bg: "blue.100" }}
          >
            Panxora AI
          </Highlight>
        </Heading>
        <Stack direction="row" pl={10} gap={4}>
          <Button
            fontFamily="'Quicksand', sans-serif"
            fontWeight="bold"
            colorScheme="blue"
            variant="ghost"
            fontSize={20}
            rounded={20}
          >
            <NextLink href="/" passHref>
              <Link style={{ textDecoration: "none" }}>Token</Link>
            </NextLink>
          </Button>
          <Button
            fontFamily="'Quicksand', sans-serif"
            fontWeight="bold"
            colorScheme="blue"
            variant="ghost"
            fontSize={20}
            rounded={20}
          >
            <NextLink href="/Lock" passHref>
              <Link style={{ textDecoration: "none" }}>Lock</Link>
            </NextLink>
          </Button>
          <Button
            fontFamily="'Quicksand', sans-serif"
            fontWeight="bold"
            colorScheme="blue"
            variant="ghost"
            fontSize={20}
            rounded={20}
          >
            <NextLink href="/Ballots" passHref>
              <Link style={{ textDecoration: "none" }}>Vote</Link>
            </NextLink>
          </Button>
        </Stack>
      </Stack>

      <Box alignContent="center" textAlign="center" alignSelf="center">
        <Button
          pb={3}
          pt={3}
          m={0}
          pl={0}
          pr={5}
          bg={props.buttonBg}
          rounded={20}
          color="white"
          onClick={connectWallet}
        >
          {data.isConnected == true ? (
            <Box
              alignContent="center"
              textAlign="center"
              alignSelf="center"
              bg="#1272FC"
              pt={3}
              pl={3}
              pr={3}
              pb={2}
              rounded={20}
            >
              <Image src="/wallet.svg" width={25} height={25} alt="" />
            </Box>
          ) : (
            ""
          )}
          {clicked == false ? (
            <Text fontWeight="bold" ml={3}>
              {data.address}
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
        {/* <Box mt={1}>
          {data.isID == true && data.isConnected == true ? (
            <Badge ml="1" fontSize="0.8em" colorScheme="green">
              Connected
            </Badge>
          ) : (
            <Badge ml="1" fontSize="0.8em" colorScheme="red">
              Not Connected
            </Badge>
          )}
        </Box> */}
      </Box>
      <Box
        alignSelf="center"
        p={3}
        backgroundColor="blackAlpha.300"
        rounded={20}
      >
        <Stack direction="row" align="center">
          {isLight == true ? <MoonIcon h={5} w={5} /> : <SunIcon h={5} w={5} />}
          <Switch
            size="md"
            colorScheme="blackAlpha"
            onChange={toggleBackground}
          />
        </Stack>
      </Box>
    </Stack>
  );
};

export default Navbar;
