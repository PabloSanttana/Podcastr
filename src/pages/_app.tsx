import type { AppProps } from "next/app";
import { ThemeProvider } from "styled-components";

import Header from "@/components/Header";
import Player from "@/components/Player";

import light from "@/Theme/light";
import { GlobalStyle } from "@/styles/global";
import { AppWrapper } from "@/styles/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={light}>
      <GlobalStyle />
      <AppWrapper>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </AppWrapper>
    </ThemeProvider>
  );
}
