import React, { useEffect, useRef, useState } from "react";
import { LinearCopy } from "gl-react";
import { Surface } from "gl-react-dom";
import GLTransition from "react-gl-transition";
import GLTransitions from "gl-transitions";
import GLImage from "gl-react-image";

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

const newTransitions = {
  glsl: `#define PI 3.14159265359
// Author:Tien Cuong Dang
// License: MIT

const vec2 center = vec2(1.1, 0.9);
const vec2 center2 = vec2(1., 0.);
const float rotations  =-1.;
const float scale = 2.;
float Exponential_easeInOut(in float begin, in float change, in float duration, in float time) {
   if (time == 0.0)
       return begin;
   else if (time == duration)
       return begin + change;
   time= time / (duration / 2.0);
   if (time < 1.0)
       return change / 2.0 * pow(2.0, 10.0 * (time - 1.0)) + begin;
   return change / 2.0 * (-pow(2.0, -10.0 * (time - 1.0)) + 2.0) + begin;
}

vec2 mirrorRepeat(vec2 uv) {
  return 1.0 - abs(1.0 - mod(uv, 2.0));
}
float rand (vec2 co) {
  return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}
vec2 rotated(vec2 uv, vec2 origin, float t) {
  vec2 difference =  uv - origin;
  vec2 dir = normalize(difference);
  float dist = length(difference);
  
  float angle = 2.0 * PI * rotations * (t < 0.5 ? t : t - 1.);
  
  float c = cos(angle);
  float s = sin(angle);
  float currentScale = mix(scale, 1.0, 2.0 * abs(t - 0.5)); 
  vec2 rotatedDir = vec2(dir.x *c - dir.y * s, dir.x * s + dir.y * c);
  return origin + rotatedDir * dist / currentScale;
}
vec4 transition (vec2 uv) {
  float t = Exponential_easeInOut(0., 1., 1., progress);
  if (t <0.5) {
    return getFromColor(mirrorRepeat(rotated(uv, center, t)) + rand(uv) / 10. * t);
   } else {
    return getToColor(mirrorRepeat(rotated(uv, center2, t)) + rand(uv) / 10. * (1. - t));
  } 
}
`,
  name: "transition"
};

interface SlideShowProps {
  slides: { image: string }[];
  duration?: number;
  currentIdx: number;
}
export const SlideShow = (props: SlideShowProps) => {
  const { slides, currentIdx, duration = 1500 } = props;

  const previousIdx = usePrevious(currentIdx);
  const [currentIdxSlide, setCurrentIdxSlide] = useState(currentIdx);
  const from = slides[previousIdx ?? currentIdxSlide].image;
  const to = slides[currentIdxSlide].image;
  const transition = GLTransitions[10];
  const [progress, setProgress] = useState(0);
  const INTERVAL = 1000 / 60;
  const size = useWindowSize();

  useEffect(() => {
    if (progress >= 1 && currentIdx !== currentIdxSlide) {
      setProgress(0);
      setCurrentIdxSlide(currentIdx);
    }
  }, [currentIdx, progress < 1]);

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
      {progress > 0 ? (
        <GLTransition
          from={<GLImage source={from} />}
          to={<GLImage source={from} />}
          progress={progress}
          transition={newTransitions}
        />
      ) : (
        // <LinearCopy>{from} </LinearCopy>
        <GLImage source={from} />
      )}
    </Surface>
    // <Surface width={300} height={400}>
    //   <GLImage source={from} />
    // </Surface>
  );
};
