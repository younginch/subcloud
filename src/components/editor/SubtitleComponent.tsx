import { Text, Stack, useInterval } from "@chakra-ui/react";
import { RefObject, useContext, useState } from "react";
import { EditorContext } from "../../pages/editor";

type Props = {
  boxRef: RefObject<HTMLDivElement>;
};

export default function SubtitleComponent({ boxRef }: Props) {
  const fontSizeSetting = 60; // default size
  const fontSize = boxRef.current
    ? (boxRef.current?.offsetWidth / 3000) * fontSizeSetting
    : 15;
  const paddingUnit = fontSize / 5;

  const [textArray, setTextArray] = useState<string[]>([]);
  const { contents, getPlayerTime } = useContext(EditorContext);

  const intervalSub = () => {
    const currentTime = getPlayerTime();
    if (!currentTime) {
      return;
    }

    for (let i = 0; i < contents.length; i++) {
      if (
        contents[i].startTime <= currentTime &&
        currentTime <= contents[i].endTime
      ) {
        setTextArray(contents[i].textArray);
        return;
      }
    }
    setTextArray([]);
  };

  useInterval(intervalSub, 200);

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
      {textArray.map((text, index) => (
        <Text
          key={index}
          bg="black"
          w="fit-content"
          p={`0px ${paddingUnit * 2}px 0px ${paddingUnit * 2}px`}
          whiteSpace="nowrap"
        >
          {text}
        </Text>
      ))}
    </Stack>
  );
}
