import { useInterval, Box, useToast, Stack } from "@chakra-ui/react";
import { useContext, useEffect, useRef, useState } from "react";
import YouTube, { YouTubeEvent, YouTubeProps } from "react-youtube";
import { v4 as uuidv4 } from "uuid";
import { EditorContext } from "../../pages/editor";

function calculateLayout(sliderValue: number): [number, number] | undefined {
  const outerVideo = document.querySelector(".youtubeContainer") as HTMLElement;
  const outerHeight = outerVideo?.offsetHeight;

  const innerWidth = outerVideo.offsetWidth;
  const innerHeight = outerVideo.offsetHeight;
  const fontSize = (innerWidth / 2500.0) * sliderValue;
  const subtitleMt =
    (outerHeight - innerHeight) / 2 + innerHeight * 0.87 - fontSize / 2;

  return [fontSize, subtitleMt];
}

type SubtitleComponentProps = {
  element: HTMLDivElement | null;
  textArray: string[];
};

function SubtitleComponent({ element, textArray }: SubtitleComponentProps) {
  const [fontSize, setFontSize] = useState<number>(12);
  const [subtitleMt, setSubtitleMt] = useState<number>(300);

  function layoutUpdater() {
    const res = calculateLayout(60);
    if (res) {
      setFontSize(res[0]);
      setSubtitleMt(res[1]);
    }
  }

  useInterval(layoutUpdater, 20);

  return (
    <Box
      position="absolute"
      zIndex={1}
      top={element?.clientTop}
      left={element?.clientLeft}
      width={element?.clientWidth}
      height={element?.clientHeight}
    >
      <Box textAlign="center">
        {textArray
          ? textArray.map((text, index) => (
              <Box
                key={uuidv4()}
                w="max-content"
                margin="auto"
                style={{
                  fontSize: `${fontSize}px`,
                }}
              >
                {text}
              </Box>
            ))
          : ""}
      </Box>
    </Box>
  );
}

export default function YoutubeWithSub({ id }: { id: string }) {
  const { setPlayer, getPlayerTime } = useContext(EditorContext);
  const toast = useToast();
  const boxRef = useRef<HTMLDivElement>(null);
  const [textArray, setTextArray] = useState<string[]>([]);

  const { contents } = useContext(EditorContext);

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

  function onPlayerError(event: YouTubeEvent<number>) {
    toast({
      title: "Error (Youtube)",
      description: `${event.data}`,
      status: "error",
    });
  }

  const opts: YouTubeProps["opts"] = {
    height: boxRef.current?.offsetHeight,
    width: boxRef.current?.offsetWidth,
  };

  return (
    <Stack w="100%" h="100%" alignItems="center">
      <Box
        h="100%"
        maxH="100%"
        maxW="100%"
        ref={boxRef}
        style={{ aspectRatio: "16/9" }}
      >
        <SubtitleComponent element={boxRef.current} textArray={textArray} />
        <YouTube
          videoId={id}
          opts={opts}
          className="youtubeContainer"
          onReady={(event) => setPlayer(event.target)}
          onError={onPlayerError}
        />
      </Box>
    </Stack>
  );
}
