import HeadMeta from "@/components/HeadMeta";
import theme from "@/theme/theme";
import { ChakraProvider } from "@chakra-ui/react";
import { Analytics } from '@vercel/analytics/react';
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import Header from "../components/Header";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <HeadMeta />
      <Analytics />
      <ChakraProvider theme={theme}>
        <RecoilRoot>
          <Header />
          <Component {...pageProps} />
        </RecoilRoot>
      </ChakraProvider>
    </>
  );
}
