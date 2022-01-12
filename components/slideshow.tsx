import React, { useEffect, useRef, useState } from "react";
import { LinearCopy } from "gl-react";
import { Surface } from "gl-react-dom";
import GLTransition from "react-gl-transition";
import GLTransitions from "gl-transitions";
import { useWindowSize } from "../hooks/useWindowSize";

function usePrevious<T>(value: T) {
  const [temp, setTemp] = useState<T | null>(null);
  const [previous, setPrevious] = useState<T | null>(null);
  useEffect(() => {
    setTemp(value);
    setPrevious(temp);
  }, [value]);
  return previous;
}

interface SlideShowProps {
  slides: { image: string }[];
  duration?: number;
  currentIdx: number;
}
export const SlideShow = (props: SlideShowProps) => {
  const { slides, currentIdx, duration = 1500 } = props;

  const previousIdx = usePrevious(currentIdx);
  const to = slides[currentIdx].image;
  const from = (previousIdx !== null && slides[previousIdx].image) || null;
  const transition = GLTransitions[5];
  const [progress, setProgress] = useState(0);
  const INTERVAL = 1000 / 60;
  const size = useWindowSize();

  useEffect(() => {
    setProgress(0);
  }, [currentIdx]);

  useEffect(() => {
    if (progress < 1) {
      setTimeout(() => {
        setProgress(progress + INTERVAL / duration);
      }, INTERVAL);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress]);

  return (
    <Surface width={size.width} height={size.height}>
      {progress > 0 && from ? (
        <GLTransition
          from={from}
          to={to}
          progress={progress}
          transition={transition}
        />
      ) : (
        <LinearCopy>{from || to} </LinearCopy>
      )}
    </Surface>
    // <Surface width={300} height={400}>
    //   <GLImage source={from} />
    // </Surface>
  );
};
