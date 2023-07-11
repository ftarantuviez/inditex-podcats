import Layout from "@/components/Layout/Layout";
import PodcastsProvider from "@/context/PodcastContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <PodcastsProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </PodcastsProvider>
  );
}
