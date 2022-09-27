import Layout from "./components/Layout";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <div className='App'>
        <Layout />
      </div>
    </ChakraProvider>
  );
}

export default App;
