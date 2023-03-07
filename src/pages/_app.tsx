import { RecoilRoot } from "recoil";
import type { AppProps } from "next/app";
import { ChakraProvider, Container } from "@chakra-ui/react";
import Header from "./Header";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <RecoilRoot>
        <Header />
        <Container w={'100%'}>
          <Component {...pageProps} />
        </Container>
      </RecoilRoot>
    </ChakraProvider>
  );
}
