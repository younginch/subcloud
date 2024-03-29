import { Box, useToast, Stack, useColorModeValue } from "@chakra-ui/react";
import { useContext, useRef } from "react";
import YouTube, { YouTubeEvent, YouTubeProps } from "react-youtube";
import { EditorContext } from "../../utils/editorCore";
import SubtitleComponent from "./SubtitleComponent";

export default function YoutubePlayer({ id }: { id: string }) {
  const { setPlayer, setState } = useContext(EditorContext);
  const toast = useToast();
  const boxRef = useRef<HTMLDivElement>(null);
  const youtubeBodyBg = useColorModeValue("#f2f2f2", "#161616");

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
    <Stack w="100%" h="100%" alignItems="center" bg={youtubeBodyBg}>
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
