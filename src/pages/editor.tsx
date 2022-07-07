import { ReflexContainer, ReflexElement, ReflexSplitter } from "react-reflex";
import { PageOptions } from "../utils/types";
import "react-reflex/styles.css";
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
} from "@chakra-ui/react";
import { FormEvent, useCallback, useEffect, useState } from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { SRTContent, SRTFile } from "@younginch/subtitle";
import { useDropzone } from "react-dropzone";
import { DeleteIcon } from "@chakra-ui/icons";
import React from "react";
import ReactTimeline from "../components/editor/timeline";
import { v4 as uuidv4 } from "uuid";
import Shortcuts from "../components/editor/shortcuts";
import YoutubeWithSub from "../components/editor/contentItem";
import { useHotkeys } from "react-hotkeys-hook";

dayjs.extend(duration);

function miliToString(mili: number): string {
  return dayjs
    .duration(mili * 1000)
    .format("HH:mm:ss,SSS")
    .substring(0, 12);
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

  useHotkeys("tab", () => console.log("sex"), {
    filterPreventDefault: true,
    enableOnContentEditable: true,
  });

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
          <Shortcuts />
        </HStack>
      </ReflexElement>
      <ReflexSplitter />
      <ReflexElement minSize={50} size={50}>
        <ReactTimeline contents={contents} />
      </ReflexElement>
      <ReflexSplitter />
      <ReflexElement className="right-pane">
        {contents.map((value, index) => {
          return (
            <HStack key={uuidv4()}>
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
                value={value.toText()}
                onChange={(event) => {
                  contents[index].textArray = event.target.value.split("\n");
                  setContents(contents);
                }}
              />
              <IconButton
                aria-label="Delete subtitle"
                icon={<DeleteIcon />}
                onClick={() => {
                  setContents((prevContents) => {
                    const newContents = [...prevContents].splice(index, 1);
                    return newContents;
                  });
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
            setContents((prevContents) => [...prevContents, newContent]);
          }}
        >
          자막 추가
        </Button>
      </ReflexElement>
    </ReflexContainer>
  );
}

Editor.options = { auth: false, hideTitle: true } as PageOptions;
