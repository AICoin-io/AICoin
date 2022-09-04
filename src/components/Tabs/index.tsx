import type { NextPage } from "next";
import { Heading, Highlight, Stack } from "@chakra-ui/react";

const TabsComponent: NextPage = () => {
  return (
    <Stack>
      <Heading
        lineHeight="tall"
        maxW={["80%", "70%", "60%"]}
        ml="auto"
        mr="auto"
      >
        <Highlight
          query={["unique", "utility Token", "AI Trading"]}
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
    </Stack>
  );
};

export default TabsComponent;
