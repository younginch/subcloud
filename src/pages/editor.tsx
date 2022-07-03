import { ReflexContainer, ReflexElement, ReflexSplitter } from "react-reflex";
import { PageOptions } from "../utils/types";
import "react-reflex/styles.css";
import YouTube, {
  YouTubeEvent,
  YouTubePlayer,
  YouTubeProps,
} from "react-youtube";
import {
  Box,
  Button,
  Editable,
  EditableInput,
  EditablePreview,
  FormControl,
  HStack,
  IconButton,
  Input,
  Stack,
  Text,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { FormEvent, useCallback, useRef, useState } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { SRTContent, SRTFile } from "@younginch/subtitle";
import { useDropzone } from "react-dropzone";
import { DeleteIcon } from "@chakra-ui/icons";
import React from "react";
import { useInterval } from "../utils/subtitle";
import { Timeline } from "vis-timeline/esnext";
import ReactTimeline from "../components/timeline";

dayjs.extend(duration);

function miliToString(mili: number): string {
  return dayjs.duration(mili * 1000).format("HH:mm:ss,SSS");
}

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
                key={index}
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

type YoutubeWithSubProps = {
  youtubeId?: string;
  contents: SRTContent[];
};

function YoutubeWithSub({ youtubeId, contents }: YoutubeWithSubProps) {
  const toast = useToast();
  const boxRef = useRef<HTMLDivElement>(null);
  const [player, setPlayer] = useState<YouTubePlayer>();
  const [textArray, setTextArray] = useState<string[]>([]);

  const intervalSub = () => {
    const currentTime = player?.getCurrentTime();
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
    <Box h="100%" ref={boxRef} style={{ aspectRatio: "16/9" }}>
      <SubtitleComponent element={boxRef.current} textArray={textArray} />
      <YouTube
        videoId={youtubeId}
        opts={opts}
        className="youtubeContainer"
        onReady={(event) => setPlayer(event.target)}
        onError={onPlayerError}
      />
    </Box>
  );
}

export default function Editor() {
  const toast = useToast();
  const [youtubeId, setYoutubeId] = useState("i7muqI90138");
  const [urlInput, setUrlInput] = useState("");
  const [contents, setContents] = useState<SRTContent[]>([]);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles[0].text().then((text) => {
      const srtFile = SRTFile.fromText(text);
      setContents([]);
      setContents(srtFile.array);
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  function downloadSRT() {
    const srtFile = new SRTFile();
    srtFile.array = contents;
    const url = window.URL.createObjectURL(new Blob([srtFile.toText()]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `file.srt`);
    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);
  }

  return (
    <ReflexContainer
      style={{ width: "100vw", height: "80vh" }}
      orientation="horizontal"
    >
      <ReflexElement minSize={100}>
        <HStack h="100%" w="100%">
          <YoutubeWithSub youtubeId={youtubeId} contents={contents} />
          <Stack>
            <Box
              maxW="200px"
              maxH="100px"
              borderWidth="1px"
              borderRadius="6px"
              m={6}
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <p>
                  Drag &apos;n&apos; drop some files here, or click to select
                  files
                </p>
              )}
            </Box>
            <Button onClick={downloadSRT}>Save to SRT</Button>
            <Button
              onClick={() => {
                setContents([]);
              }}
            >
              Delete all
            </Button>
            <form
              onSubmit={(event: FormEvent) => {
                event.preventDefault();
                try {
                  const id = new URL(urlInput).searchParams.get("v");
                  if (!id) {
                    throw new Error("");
                  }
                  setYoutubeId(id);
                } catch {
                  toast({
                    title: "Error (URL)",
                    description: "Invalid URL",
                    status: "error",
                  });
                }
              }}
            >
              <FormControl>
                <Input
                  type="url"
                  id="url"
                  value={urlInput}
                  onChange={(event) => {
                    setUrlInput(event.target.value);
                  }}
                />
              </FormControl>
              <Button type="submit">변경</Button>
            </form>
          </Stack>
        </HStack>
      </ReflexElement>
      <ReflexSplitter />
      <ReflexElement minSize={100}>
        <ReactTimeline />
      </ReflexElement>
      <ReflexSplitter />
      <ReflexElement className="right-pane">
        {contents.map((value, index) => {
          return (
            <HStack
              key={`${index}${value.startTime}${
                value.endTime
              }${value.toText()}`}
            >
              <Text>{index + 1}</Text>
              <Stack w="170px">
                <Editable defaultValue={miliToString(value.startTime!)}>
                  <EditablePreview />
                  <EditableInput />
                </Editable>
                <Editable defaultValue={miliToString(value.endTime!)}>
                  <EditablePreview />
                  <EditableInput />
                </Editable>
              </Stack>
              <Textarea
                noOfLines={2}
                defaultValue={value.toText()}
                onChange={(event) => {
                  contents[index].textArray = event.target.value.split("\n");
                  setContents(contents);
                }}
              />
              <IconButton
                aria-label="Delete subtitle"
                icon={<DeleteIcon />}
                onClick={() => {
                  const newContents = [...contents].splice(index, 1);
                  setContents([]);
                  setContents(newContents);
                }}
              />
            </HStack>
          );
        })}
        <Button
          onClick={() => {
            const newContent = new SRTContent(
              contents.length.toString(),
              "00:00:00,000 --> 00:00:00,000",
              []
            );
            setContents([...contents, newContent]);
          }}
        >
          자막 추가
        </Button>
      </ReflexElement>
    </ReflexContainer>
  );
}

Editor.options = { auth: false, hideTitle: true } as PageOptions;
