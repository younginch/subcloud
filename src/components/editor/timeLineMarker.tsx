import { Box, createIcon, keyframes, useInterval } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { EditorContext } from "../../pages/editor";

export const TimeLineMarkerSVG = createIcon({
  displayName: "SubCloud Logo ",
  viewBox: "4 4 56 920",
  path: (
    <g
      xmlns="http://www.w3.org/2000/svg"
      clipPath="url(#clip0)"
      transform="translate(-2314 -907)"
    >
      <path
        d="M2373 910 2373 949 2345 977 2317 949 2317 910Z"
        fill="#FF0000"
        fillRule="evenodd"
        fillOpacity="1"
      />
      <rect
        x="2337"
        y="962"
        width="15.9998"
        height="920"
        fill="#FF0000"
        fillOpacity="1"
      />
    </g>
  ),
});

export default function TimeLineMarker() {
  const { leftTime, rightTime, getPlayerTime } = useContext(EditorContext);

  const changeLeft = keyframes`
  0% {
    left: ${((getPlayerTime() - leftTime) / (rightTime - leftTime)) * 6000}px;
  }
  100% {
    left:6000px;
  }
  `;

  return (
    <Box
      left={`${2500}px`}
      top="26px"
      position="absolute"
      zIndex={11}
      animation={`${
        (rightTime - getPlayerTime()) / 1000
      }s ${changeLeft} linear`}
    >
      <TimeLineMarkerSVG h="200px" cursor="grab" />
    </Box>
  );
}
