import { useState } from "react";
import { SlideShow } from "../components/slideshow";
export default {
  title: "Slideshow",
  component: SlideShow
};
export const Default = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const data = [
    { image: "https://source.unsplash.com/random/468x600" },
    { image: "https://source.unsplash.com/random/468x600" },
    { image: "https://source.unsplash.com/random/468x600" },
    { image: "https://source.unsplash.com/random/468x600" }
  ];
  return (
    <div style={{ backgroundColor: "#333", width: "100vw", height: "100vh" }}>
      <SlideShow slides={data} currentIdx={currentIdx} />
    </div>
  );
};
