import type { NextPage } from "next";
import { Grid, Box, Text, Stack, GridItem } from "@chakra-ui/react";

const AdminFunctions: NextPage = () => {
  return (
    <Stack direction="column">
      <Grid
        templateColumns="repeat(2, 4fr)"
        gap={8}
        maxWidth="60%"
        pt={10}
        ml="auto"
        mr="auto"
      >
        <GridItem bg="#092B7E" rounded={40} width="100%" p={10}>
          <Box>
            <Text
              fontFamily="Quicksand"
              textAlign="center"
              fontWeight="light"
              fontSize="2xl"
            >
              Create a new Ballot
            </Text>
          </Box>
        </GridItem>
        <GridItem bg="#092B7E" rounded={40} width="100%" p={10}>
          <Box>
            <Text
              fontFamily="Quicksand"
              textAlign="center"
              fontWeight="light"
              fontSize="2xl"
            >
              Seal a Ballot
            </Text>
            <Text
              fontFamily="Quicksand"
              textAlign="center"
              fontWeight="light"
              fontSize="2xl"
            >
              Close a Ballot
            </Text>
          </Box>
        </GridItem>
      </Grid>
    </Stack>
  );
};

export default AdminFunctions;
