import React, { useEffect } from "react";
import { Headings } from "../components/headings";

export default {
  title: "Headings",
  component: Headings
};
export const DefaultIndicator = () => {
  const [currentIdx, setCurrentIdx] = React.useState(0);
  const description =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
  const data = [
    { title: "Australia", description: `1 ${description}` },
    { title: "Europe", description: `2 ${description}` },
    { title: "Africa", description: `3 ${description}` },
    { title: "Asia", description: `4 ${description}` },
    { title: "America", description: `5 ${description}` },
    { title: "Arctic", description: `6 ${description}` }
  ];
  useEffect(() => {
    setTimeout(() => {
      setCurrentIdx((currentIdx + 1) % data.length);
    }, 3000);
  }, [currentIdx]);
  return (
    <div style={{ backgroundColor: "#333", width: "100vw", height: "100vh" }}>
      <Headings data={data} currentIdx={currentIdx} />
    </div>
  );
};
