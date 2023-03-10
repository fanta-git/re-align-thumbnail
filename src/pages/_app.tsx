import { RecoilRoot } from "recoil";
import type { AppProps } from "next/app";
import { ChakraProvider, Container } from "@chakra-ui/react";
import Header from "../components/Header";
import theme from "@/theme/theme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <RecoilRoot>
        <Header />
        <Component {...pageProps} />
      </RecoilRoot>
    </ChakraProvider>
  );
}
