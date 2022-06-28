import { ReflexContainer, ReflexElement, ReflexSplitter } from "react-reflex";
import { PageOptions } from "../utils/types";
import "react-reflex/styles.css";
import YouTube from "react-youtube";
import {
  Box,
  Button,
  Editable,
  EditableInput,
  EditablePreview,
  HStack,
  IconButton,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useCallback, useState } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { SRTContent, SRTFile } from "@younginch/subtitle";
import { useDropzone } from "react-dropzone";
import { DeleteIcon } from "@chakra-ui/icons";

dayjs.extend(duration);

function miliToString(mili: number): string {
  return `${dayjs.duration(mili * 1000).format("HH:mm:ss,SSS")}`;
}

export default function Editor() {
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
        <HStack>
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
        </HStack>
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
