import { ReflexContainer, ReflexElement, ReflexSplitter } from "react-reflex";
import { PageOptions } from "../utils/types";
import "react-reflex/styles.css";
import YouTube from "react-youtube";
import {
  Box,
  Editable,
  EditableInput,
  EditablePreview,
  HStack,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useCallback, useState } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import SRTFile from "@younginch/subtitle/dist/subtitles/srt";
import { useDropzone } from "react-dropzone";

dayjs.extend(duration);

interface Subtitle {
  data: {
    startTime?: number;
    endTime?: number;
    text?: string;
  }[];
}

const dataExample = [
  {
    start: 0,
    end: 11234,
    text: "Hello World",
  },
];

function miliToString(mili: number): string {
  return `${dayjs.duration(mili).format("HH:mm:ss,SSS")}`;
}

export default function Editor() {
  const [subtitle, setSubtitle] = useState<Subtitle>({ data: dataExample });
  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles[0].text().then((text) => {
      const srtFile = new SRTFile(text);
      setSubtitle({ data: srtFile.array });
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <ReflexContainer
      style={{ width: "100vw", height: "50vh" }}
      orientation="vertical"
    >
      <ReflexElement minSize={100}>
        <YouTube />
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
              Drag &apos;n&apos; drop some files here, or click to select files
            </p>
          )}
        </Box>
      </ReflexElement>
      <ReflexSplitter />
      <ReflexElement className="right-pane">
        {subtitle?.data.map((value, index) => {
          return (
            <HStack key={`${value.startTime}${value.endTime}${value.text}`}>
              <Text>{index + 1}</Text>
              <Stack>
                <Editable defaultValue={miliToString(value.startTime!)}>
                  <EditablePreview />
                  <EditableInput />
                </Editable>
                <Editable defaultValue={miliToString(value.endTime!)}>
                  <EditablePreview />
                  <EditableInput />
                </Editable>
              </Stack>
              <Textarea noOfLines={2} defaultValue={value.text} />
            </HStack>
          );
        })}
      </ReflexElement>
    </ReflexContainer>
  );
}

Editor.options = { auth: false } as PageOptions;
