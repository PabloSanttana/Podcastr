import type { AppProps } from "next/app";
import Head from "next/head";

import Header from "@/components/Header";
import Player from "@/components/Player";

import { GlobalStyle } from "@/styles/global";
import { AppWrapper } from "@/styles/app";
import { PlayerProvider } from "@/contexts/PlayerContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Podcastr</title>
        <meta name="description" content="Podcastr" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      <PlayerProvider>
        <GlobalStyle />
        <AppWrapper>
          <main>
            <Header />
            <Component {...pageProps} />
          </main>
          <Player />
        </AppWrapper>
      </PlayerProvider>
    </>
  );
}
