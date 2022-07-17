import { useInterval, Box, useToast, Stack } from "@chakra-ui/react";
import { useContext, useRef, useState } from "react";
import YouTube, { YouTubeEvent, YouTubeProps } from "react-youtube";
import { EditorContext } from "../../pages/editor";
import SubtitleComponent from "./SubtitleComponent";

export default function YoutubePlayer({ id }: { id: string }) {
  const { setPlayer, getPlayerTime } = useContext(EditorContext);
  const toast = useToast();
  const boxRef = useRef<HTMLDivElement>(null);
  const [textArray, setTextArray] = useState<string[]>([]);

  const { contents, setState } = useContext(EditorContext);

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
        style={{ aspectRatio: "2" }}
        display="flex"
        alignItems="center"
      >
        <Box w="100%" position="relative" ref={boxRef}>
          <SubtitleComponent boxRef={boxRef} />
          <YouTube
            videoId={id}
            opts={opts}
            className="youtubeContainer"
            onReady={(event) => setPlayer(event.target)}
            onStateChange={(event) => {
              setState(event.data);
            }}
            onError={onPlayerError}
          />
        </Box>
      </Box>
    </Stack>
  );
}
