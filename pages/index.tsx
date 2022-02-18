import { Headings } from "../components/headings";
import { Indicators } from "../components/indicators";
import { data } from "../utils/data";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { Box, Flex } from "rebass";
import styles from "../styles/Home.module.css";
import { CardList } from "../components/card-list";
import { SlideShow } from "../components/slideshow";
import { useWindowSize } from "../hooks/useWindowSize";
import { getPlaiceholder } from "plaiceholder";

export const getStaticProps = async () => {
  const { base64, img } = await getPlaiceholder("/path-to-your-image.jpg");

  return {
    props: {
      imageProps: {
        ...img,
        blurDataURL: base64
      }
    }
  };
};

const Home: NextPage = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const size = useWindowSize();
  return (
    <Flex
      sx={{
        justifyContent: "space-around",
        flexDirection: "column",
        bg: "#333",
        minHeight: "100vh",
        minWidth: "100vw",
        width: `${size.width}px`,
        height: `${size.height}px`
      }}>
      <Flex sx={{ height: "10vh" }}></Flex>
      <Box sx={{ position: "absolute", inset: 0 }}>
        <SlideShow slides={data} currentIdx={currentIdx} />
      </Box>
      <Flex sx={{ justifyContent: "space-between", ml: "2vw", mb: "2vw" }}>
        <Indicators
          total={data.length}
          currentIdx={currentIdx}
          onSelect={setCurrentIdx}
        />

        <Headings data={data} currentIdx={currentIdx} width="26vw" />
        <CardList data={data[currentIdx].items} width="54vw" />
      </Flex>
    </Flex>
  );
};

export default Home;
