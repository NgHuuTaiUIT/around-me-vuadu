import { SlideShow } from "../components/slideshow";
import React, { useState } from "react";

interface Props {}

const test = (props: Props) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const data = [
    { image: "https://source.unsplash.com/random/468x600?space" },
    { image: "https://source.unsplash.com/random/469x600" },
    { image: "https://source.unsplash.com/random/1000x1000" },
    { image: "https://source.unsplash.com/random/468x600" }
  ];
  return (
    <div style={{ backgroundColor: "#333", width: "100vw", height: "100vh" }}>
      <button onClick={() => setCurrentIdx(currentIdx + 1)}>Next </button>
      <button onClick={() => setCurrentIdx(currentIdx - 1)}>Pre </button>

      <SlideShow slides={data} currentIdx={currentIdx} />
    </div>
  );
};

export default test;
