import type { NextPage } from "next";
import {
  Heading,
  Highlight,
  Stack,
  Text,
  List,
  ListItem,
  ListIcon,
  Box,
} from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";

const Content: NextPage = () => {
  return (
    <Stack direction="column">
      <Box>
        <Heading
          lineHeight="tall"
          maxW={["80%", "70%", "60%"]}
          ml="auto"
          mr="auto"
          size="lg"
        >
          <Highlight
            query={["unique", "utility Token", "benefits"]}
            styles={{
              px: "2",
              py: "1",
              rounded: "full",
              bg: "blue.100",
            }}
          >
            AICOIN is a unique concept in Finance. It is a utility Token that
            gives Holders access to a range of benefits based on the AI Trading
            modeling and other technologies developed by the founding team.
          </Highlight>
        </Heading>
      </Box>
      <Box alignSelf="center" maxW="60%">
        <Text mb={5} mt={20} fontSize="3xl" fontWeight="bold">
          Overview
        </Text>
        <List spacing={3} fontSize={20}>
          <ListItem>
            <ListIcon as={CheckIcon} color="green.500" />
            RMaaS discount Cryptocurrency Risk Management as a Service (RMaaS)
            is professional software that can be used to augment a buy and hold
            strategy. Licensees that lock 5% of their investment account value
            in XAI receive a discounted licensing fee. XAI can be used to pay
            for the service as well.
          </ListItem>
          <ListItem>
            <ListIcon as={CheckIcon} color="green.500" />
            Exchange commission discount – The Panxora exchange accepts XAI to
            pay for trading commissions at a 50% discount.
          </ListItem>
          <ListItem>
            <ListIcon as={CheckIcon} color="green.500" />
            Free Basket Trading | ETF Builder. Locking 2% of an exchange account
            value in XAI gives investors access to Panxora’s ETF creation
            service.
          </ListItem>
          <ListItem>
            <ListIcon as={CheckIcon} color="green.500" />
            Reverse auction token buybacks. A pool of digital assets are traded
            using the founders deep learning trading models. When the models
            have a profitable trading month, in the following month 50% of those
            profits are used to buy back and lock XAI tokens. This decreasing
            token supply will support appreciation in the value of the tokens.
          </ListItem>
        </List>
      </Box>
    </Stack>
  );
};

export default Content;
