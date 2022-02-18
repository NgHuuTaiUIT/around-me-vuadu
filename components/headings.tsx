import React from "react";
import { Box, Button, Flex, Text } from "rebass";
import { useTransition, animated } from "react-spring";

const Heading = ({
  active,
  children
}: React.PropsWithChildren<{ active?: boolean }>) => {
  const commonStyles = {
    fontWeight: "bold",
    fontSize: active ? "150px" : "90px",
    letterSpacing: "-1px",
    transition: "font-size 800ms,opacity 800ms",
    color: "white"
  };

  return (
    <Box sx={{ position: "relative" }}>
      <Text
        sx={{
          opacity: active ? 0 : 1,
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.6),rgba(255, 255, 255, 0))",
          backgroundClip: "text",
          textFillColor: "transparent" as any,
          "-webkit-background-clip": "text" as any,
          "-webkit-text-fill-color": "transparent" as any,
          ...commonStyles
        }}>
        {children}
      </Text>
      <Text
        sx={{
          opacity: active ? 1 : 0,

          position: "absolute",
          top: 0,
          left: 0,
          ...commonStyles
        }}>
        {children}
      </Text>
    </Box>
  );
};
interface HeadingsProps {
  data: {
    title: string;
    description?: string;
    buttonColor?: string;
  }[];
  currentIdx: number;
  onExplore?: (idx: number) => void;
  height?: string;
  width?: string;
}

export function Headings(props: HeadingsProps) {
  const { data, currentIdx, height = "80vh", width = "50vw" } = props;
  const fadingTextPropsTransition = useTransition(data[currentIdx], {
    from: { opacity: -1 },
    enter: { opacity: 1 },
    leave: { opacity: -2 },
    delay: 300,
    config: { tension: 220, friction: 120, duration: 600 }
    // exitBeforeEnter: true
  });
  return (
    <Box sx={{ height, width, position: "relative" }}>
      <Text
        sx={{
          position: "absolute",
          top: `calc(${height} / 2 + 60px)`,
          color: "white",
          fontSize: 16,
          lineHeight: 2,
          width
        }}>
        {fadingTextPropsTransition((styles, item) => (
          <animated.div
            style={{
              ...styles,
              width,
              position: "absolute"
            }}>
            <Text>{item.description}</Text>
            <Button
              sx={{
                backgroundColor: item?.buttonColor,
                color: "white",
                px: 30,
                py: 10
              }}>
              Explore
              <Text as="span" sx={{ ml: 80 }}>
                🠒
              </Text>
            </Button>
          </animated.div>
        ))}
      </Text>

      {data.map((item, idx) => (
        <Box
          key={idx}
          sx={{
            position: "absolute",
            transition: "all 800ms",
            ...(currentIdx === idx
              ? { bottom: `calc(${height}/2)` }
              : currentIdx < idx
              ? { bottom: 0 }
              : { bottom: `calc(${height} - 106px)` }),
            opacity: Math.abs(currentIdx - idx) < 2 ? 1 : 0
          }}>
          <Heading key={idx} active={idx === currentIdx}>
            {item.title}
          </Heading>
        </Box>
      ))}
    </Box>
  );
}
