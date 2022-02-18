import { title } from "process";
import React, { useEffect, useState } from "react";
import { CardList } from "../components/card-list";

export default {
  title: "CardList",
  component: CardList
};
export const DefaultCardList = () => {
  const [currentIdx, setCurrentIdx] = useState(0);

  const data = [
    [
      {
        title: "1",
        rate: 4,
        image: "https://source.unsplash.com/random/468x600"
      },
      {
        title: "2",
        rate: 4,
        image: "https://source.unsplash.com/random/4480×5600"
      },
      {
        title: "3",
        rate: 4,
        image: "https://source.unsplash.com/random/468x600"
      },
      {
        title: "4",
        rate: 4,
        image: "https://source.unsplash.com/random/468x600"
      }
    ],
    [
      {
        title: "11",
        rate: 4,
        image: "https://source.unsplash.com/random/468x600?space"
      },
      {
        title: "22",
        rate: 4,
        image: "https://source.unsplash.com/random/4480×5600?space"
      },
      {
        title: "33",
        rate: 4,
        image: "https://source.unsplash.com/random/468x600?space"
      },
      {
        title: "44",
        rate: 4,
        image: "https://source.unsplash.com/random/468x600?space"
      }
    ]
  ];

  return (
    <div style={{ backgroundColor: "#333", width: "100vw", height: "100vh" }}>
      <button onClick={() => setCurrentIdx(1 - currentIdx)}>flip</button>
      <CardList width="80vw" data={data[currentIdx]} />
    </div>
  );
};
