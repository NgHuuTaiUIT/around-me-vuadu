import React, { useState } from "react";
import { Box, Flex, Text } from "rebass";

const WIDTH = "62px";

const Dot = (props: { active?: boolean; size: string }) => {
  return (
    <Flex
      sx={{
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: props.size,
        height: props.size,
        color: "white",
        "&:hover": {
          "> div": {
            width: "100%",
            height: "100%"
          }
        }
      }}>
      <Flex
        sx={{
          alignItems: "center",
          justifyContent: "center",
          width: props.active ? "100%" : 8,
          height: props.active ? "100%" : 8,
          backgroundColor: "white",
          borderRadius: 100,
          transition: "1s",
          boxShadow: "0px Opx 4px 2px rgba(0,0,0,0.1)"
        }}></Flex>
    </Flex>
  );
};
interface IndicatorsProps {
  total: number;
  currentIdx: number;
  onSelect?: (idx: number) => void;
  width?: string;
  height?: string;
  maxDisplayDots?: number;
}

export const Indicators = (props: IndicatorsProps) => {
  const {
    height = "80vh",
    width = "62px",
    maxDisplayDots = 6,
    onSelect
  } = props;
  const [hoveringIdx, setHoveringIdx] = useState<number | null>(null);

  return (
    <Flex
      sx={{
        position: "relative",
        height,
        justifyContent: "center",
        alignItems: "center",
        width,
        overflow: "hidden"
      }}>
      <Box
        sx={{
          opacity: 0.5,
          height: "100%"
        }}>
        {Array.from({ length: props.total }).map((_, idx) => (
          <Box
            key={idx}
            sx={{
              position: "absolute",
              left: 0,
              top: `calc(${height}/2 + ${height}/${maxDisplayDots} *${
                idx - props.currentIdx
              })`,
              transition: "top 400ms"
            }}>
            <Dot
              active={idx === props.currentIdx || idx === hoveringIdx}
              size={width}
            />
          </Box>
        ))}
        <Box
          sx={{
            width: "2px",
            height: "100%",
            backgroundColor: "white",
            ml: "50%",

            boxShadow: "0px Opx 4px 2px rgba(0,0,0,0.05)"
          }}
        />
      </Box>

      <Box>
        {Array.from({ length: props.total }).map((_, idx) => (
          <Flex
            key={idx}
            sx={{
              flexDirection: "columns",
              justifyContent: "center",
              alignItems: "center",
              position: "absolute",
              width: WIDTH,
              height: WIDTH,
              left: 0,
              top: `calc(${height}/2 + ${height}/${maxDisplayDots} *${
                idx - props.currentIdx
              })`,
              color: "white",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "top 400ms"
            }}
            onMouseEnter={() => setHoveringIdx(idx)}
            onMouseLeave={() => setHoveringIdx(null)}
            onClick={() => onSelect?.(idx)}>
            <Text
              as="span"
              sx={{
                cursor: "pointer",
                fontSize:
                  idx === props.currentIdx || idx === hoveringIdx ? 16 : "0px",
                fontWeight: "bold",
                transition: "font-size 400ms",
                color: "rgba(255,255,255,1)"
              }}>
              {idx + 1}
            </Text>
          </Flex>
        ))}
      </Box>
    </Flex>
  );
};
