import { title } from "process";
import React, { useEffect, useState } from "react";
import { CardList } from "../components/card-list";

export default {
  title: "CardList",
  component: CardList
};
export const DefaultCardList = () => {
  const [currentIdx, setCurrentIdx] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      //   setCurrentIdx((currentIdx + 1) % data.length);
    }, 3000);
  }, [currentIdx]);
  return (
    <div style={{ backgroundColor: "#333", width: "100vw", height: "100vh" }}>
      <CardList
        width="80vw"
        data={[
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
        ]}
      />
    </div>
  );
};
