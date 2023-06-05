import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import "../styles/globals.css";

export default function App(props) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>ATG-Task2</title>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width'
        />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          // globalStyles: (theme) => ({
          //   "*": {
          //     transition: "all 4s ease-in-out",
          //   },

          //   body: {
          //     // transition: "all 0.4s ease",
          //   },
          // }),
          colorScheme: "light",
        }}>
        <Component {...pageProps} />
      </MantineProvider>
    </>
  );
}
