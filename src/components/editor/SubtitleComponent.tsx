import { Text, Stack } from "@chakra-ui/react";
import { RefObject } from "react";

type Props = {
  boxRef: RefObject<HTMLDivElement>;
};

export default function SubtitleComponent({ boxRef }: Props) {
  console.log(boxRef.current?.offsetWidth, boxRef.current?.offsetHeight);

  const fontSizeSetting = 60; // default size
  const fontSize = boxRef.current
    ? (boxRef.current?.offsetWidth / 3000) * fontSizeSetting
    : 15;
  const paddingUnit = fontSize / 10;

  return (
    <Stack
      position="absolute"
      top="85%"
      left="50%"
      transform="translateX(-50%) translateY(-50%)"
      zIndex={1000}
      color="white"
      alignItems="center"
      spacing={0}
      fontSize={fontSize}
    >
      <Text
        bg="black"
        w="fit-content"
        p={`${paddingUnit}px ${paddingUnit * 2}px ${paddingUnit}px ${
          paddingUnit * 2
        }px`}
      >
        안녕하세요
      </Text>
      <Text
        bg="black"
        w="fit-content"
        p={`${paddingUnit}px ${paddingUnit * 2}px ${paddingUnit}px ${
          paddingUnit * 2
        }px`}
      >
        SubCloud 자막입니다
      </Text>
    </Stack>
  );
}
