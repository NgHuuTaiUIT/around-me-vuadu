import React, { ReactElement, useEffect, useState } from "react";
import { animated, useTransition } from "react-spring";
import { Box, Flex, Image, Text } from "rebass";

const Control = (props: { onNext?: () => void; onPrev?: () => void }) => {
  const { onNext, onPrev } = props;
  const btnStyle = {
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: 80,
    borderRadius: 80,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    cursor: "pointer",
    fontSize: "larger",
    fontWeight: "bold"
  };
  return (
    <Flex sx={{ color: "white", fontSize: 32, gap: 18 }}>
      <Flex sx={btnStyle} onClick={onPrev}>
        ‹
      </Flex>
      <Flex sx={btnStyle} onClick={onNext}>
        ›
      </Flex>
    </Flex>
  );
};

const Paging = (props: { current: number; total: number }) => {
  const { current, total } = props;

  return (
    <Flex
      sx={{
        alignItems: "center",
        color: "white",
        fontSize: 20
      }}>
      <Text>{props.current.toString().padStart(2, "0")}</Text>
      <Box
        sx={{
          width: 65,
          height: 2,
          backgroundColor: "white",
          opacity: 0.5,
          mx: 25
        }}
      />
      <Text sx={{ opacity: "0.5" }}>
        {props.total.toString().padStart(2, "0")}
      </Text>
    </Flex>
  );
};

const Card = ({
  image,
  height,
  delay,
  duration = 450,
  key
}: {
  image: string;
  height?: string;
  delay: number;
  duration?: number;
  key: string;
}) => {
  duration = duration - delay >= 150 ? duration - delay : 150;
  const cardTransitions = useTransition(image, {
    key,
    from: { transform: "rotateY(180deg)" },
    enter: { transform: "rotateY(0deg)" },
    leave: { transform: "rotateY(-180deg)" },
    delay,
    config: { tension: 220, friction: 120, duration }
    // exitBeforeEnter: true
  });
  return (
    <Flex
      sx={{
        borderRadius: "16px",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        perspective: "1000px"
      }}>
      <Box
        sx={{
          // height: `470.763px`,
          width: "100%",
          flex: "0 0 auto",
          transition: `transform ${duration}ms`,
          transformStyle: "preserve-3d",
          position: "relative",
          paddingTop: "100%"
        }}>
        {/* <Box
          sx={{
            position: "relative",
            pt: "100%",
            overflow: "hidden"
          }}> */}
        {cardTransitions((style, item) => (
          <animated.div
            style={{
              ...style,
              position: "absolute",
              paddingTop: "142%",
              overflow: "hidden",
              transition: `width ${duration}ms`,
              backfaceVisibility: "hidden",
              paddingRight: " 100%",
              top: 0
            }}>
            <Image
              src={item}
              alt="demo"
              sx={{
                position: "absolute",
                inset: 0,
                padding: "0px",
                border: "none",
                margin: "auto",
                display: "block",
                objectFit: "cover",
                objectPosition: "center",
                width: ["100%", "100%"],
                height: ["100%", "100%"],
                borderRadius: "10px"
              }}
            />
          </animated.div>
        ))}
        {/* </Box> */}
      </Box>
    </Flex>
  );
};

const CardTitle = ({
  dotSize,
  item,
  delay,
  duration = 550
}: {
  dotSize: number;
  item: {
    title: string;
    rate: number;
    image: string;
  };
  duration: number;
  delay: number;
}) => {
  duration = duration - delay >= 150 ? duration - delay : 150;
  const cardTitleTransitions = useTransition(item, {
    key: item.title,
    from: { opacity: -2 },
    enter: { opacity: 1 },
    leave: { opacity: -2 },
    delay,
    config: { tension: 220, friction: 120, duration }
  });
  return (
    <Box sx={{ height: 75 }}>
      {cardTitleTransitions((style, item) => (
        <animated.div
          style={{
            ...style,
            position: "absolute",
            backfaceVisibility: "hidden",
            transition: `width ${duration}ms`
          }}>
          <Text sx={{ color: "white", fontWeight: "bold" }}>{item.title}</Text>
          <Flex>
            {Array.from({ length: 5 }).map((_, idx) => (
              <Box
                key={idx}
                sx={{
                  width: dotSize,
                  height: dotSize,
                  borderRadius: dotSize,
                  mr: dotSize,
                  my: 25,
                  backgroundColor: "white",
                  opacity: idx < item.rate ? 1 : 0.5
                }}></Box>
            ))}
          </Flex>
        </animated.div>
      ))}
    </Box>
  );
};
interface CardListProps {
  data: {
    title: string;
    rate: number;
    image: string;
  }[];
  width?: string;
}

export function CardList(props: CardListProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const { width = "50vw" } = props;
  useEffect(() => {
    setCurrentIdx(0);
  }, [props.data]);

  return (
    <Box sx={{ overflow: "hidden", width, position: "relative" }}>
      <Flex
        sx={{
          position: "absolute",
          justifyContent: "flex-start",
          alignItems: "center",
          left: `calc((${width} / 2.5 + 40px) * ${-currentIdx})`,
          transition: "left 500ms"
        }}>
        {props.data.map((item, index) => {
          const isBig = index <= currentIdx;
          const dotSize = isBig ? 12 : 10;
          return (
            <Box
              key={index}
              mr="40px"
              sx={{
                width: `calc(${width}/${isBig ? 2.5 : 2.8})`,
                flexShrink: 0,
                transition: "all 500ms"
              }}>
              <CardTitle
                item={item}
                dotSize={dotSize}
                duration={550}
                delay={150 * index}
              />
              <Card
                image={item.image}
                delay={150 * index}
                key={index.toString()}
              />
            </Box>
          );
        })}
      </Flex>
      <Flex
        sx={{
          position: "absolute",
          bottom: 0,
          left: 25
        }}>
        <Control
          onNext={() => {
            if (currentIdx + 1 < props.data.length)
              setCurrentIdx(currentIdx + 1);
          }}
          onPrev={() => {
            if (currentIdx - 1 >= 0) setCurrentIdx(currentIdx - 1);
          }}
        />
      </Flex>
      <Flex
        sx={{
          position: "absolute",
          bottom: 0,
          right: 70
        }}>
        <Paging current={currentIdx + 1} total={props.data.length} />
      </Flex>
    </Box>
  );
}
