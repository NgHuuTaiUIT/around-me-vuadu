import React, { useState } from "react";
import { Indicators } from "../components/indicators";

export default {
  title: "Indicators",
  component: Indicators
};
export const DefaultIndicator = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  return (
    <div style={{ backgroundColor: "red", width: "100vw", height: "100vh" }}>
      <Indicators total={6} currentIdx={currentIdx} onSelect={setCurrentIdx} />
    </div>
  );
};
