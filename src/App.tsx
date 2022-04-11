import React, { useState } from "react";
import { ChakraProvider, Box, VStack, Grid, theme } from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { QueryClient, QueryClientProvider } from "react-query";
import AugmentTable from "./Table";
import UpdateComponent from "./UpdateComponent";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const queryClient = new QueryClient();

export const App = () => {
  const [lastUpdate, setLastUpdate] = useState("");

  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <ChakraProvider theme={theme}>
        <Box textAlign="center" fontSize="xl">
          <Grid minH="100vh" p={3}>
            <ColorModeSwitcher justifySelf="flex-end" />
            <VStack spacing={8}>
              <UpdateComponent date={lastUpdate} />
              <AugmentTable setUpdate={setLastUpdate} />
            </VStack>
          </Grid>
        </Box>
      </ChakraProvider>
    </QueryClientProvider>
  );
};
