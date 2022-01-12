import { Headings } from "../components/headings";
import { Indicators } from "../components/indicators";
import { data } from "../utils/data";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { Flex } from "rebass";
import styles from "../styles/Home.module.css";
import { CardList } from "../components/card-list";

const Home: NextPage = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  return (
    <Flex
      sx={{
        justifyContent: "space-around",
        flexDirection: "column",
        bg: "#333",
        minHeight: "100vh"
      }}>
      <Flex sx={{ justifyContent: "space-between", ml: 40 }}>
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
