import { Html, Head, Main, NextScript } from "next/document";
import { useEffect } from "react";

import { ServerStyleSheet } from "styled-components";

export default function Document() {
  const sheet = new ServerStyleSheet();
  useEffect(() => {
    sheet.getStyleElement();
  });
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter&family=Lexend:wght@500;600&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
