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
import {
  createContext,
  FormEvent,
  useCallback,
  useContext,
  useState,
  WheelEvent,
} from "react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { SRTContent, SRTFile } from "@younginch/subtitle";
import { useDropzone } from "react-dropzone";
import { DeleteIcon } from "@chakra-ui/icons";
import { v4 as uuidv4 } from "uuid";
import Shortcuts from "../components/editor/shortcuts";
import YoutubeWithSub from "../components/editor/contentItem";
import { useHotkeys } from "react-hotkeys-hook";
import { useRouter } from "next/router";
import TimeLine from "../components/editor/timeLine";
import TimeLineContainer from "../components/editor/timeLineContainer";
import SelectTheme from "../components/footer/selectTheme";

dayjs.extend(duration);

function miliToString(second: number): string {
  return dayjs
    .duration(second * 1000)
    .format("HH:mm:ss,SSS")
    .substring(0, 12);
}

export type contentArray = {
  uuid: string;
  content: SRTContent;
};

type TimeLineContextProps = {
  /// The left time in milliseconds
  leftTime: number;
  /// The right time in milliseconds
  rightTime: number;
  changeLRTime: (left: number, right: number) => void;
};

export const TimeLineContext = createContext<TimeLineContextProps>({
  leftTime: 0,
  rightTime: 1000 * 10,
  changeLRTime: (left, right) => {},
});

type TimeLineProviderProps = {
  children: React.ReactNode;
};

function TimeLineProvider({ children }: TimeLineProviderProps) {
  const [leftTime, setLeftTime] = useState<number>(0);
  const [rightTime, setRightTime] = useState<number>(1000 * 10);

  return (
    <TimeLineContext.Provider
      value={{
        leftTime,
        rightTime,
        changeLRTime: (left, right) => {
          setLeftTime(left);
          setRightTime(right);
        },
      }}
    >
      {children}
    </TimeLineContext.Provider>
  );
}

export default function Editor() {
  const router = useRouter();
  const toast = useToast();
  const [youtubeId, setYoutubeId] = useState(router.query.youtubeId as string);
  const [urlInput, setUrlInput] = useState("");
  const [content, setContents] = useState<contentArray[]>([]);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles[0].text().then((text) => {
      const srtFile = SRTFile.fromText(text);
      setContents(
        srtFile.array.map((content) => ({ uuid: uuidv4(), content }))
      );
    });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  useHotkeys("tab", () => console.log("sex"), {
    filterPreventDefault: true,
    enableOnContentEditable: true,
  });

  function downloadSRT() {
    const srtFile = new SRTFile();
    srtFile.array = content.map((item) => item.content);
    const url = window.URL.createObjectURL(new Blob([srtFile.toText()]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `file.srt`);
    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);
  }

  return (
    <TimeLineProvider>
      <ReflexContainer
        style={{ width: "100vw", height: "calc(100vh - 54px)" }}
        orientation="horizontal"
      >
        <ReflexElement minSize={100}>
          <HStack h="100%" w="100%">
            <YoutubeWithSub
              youtubeId={youtubeId}
              contents={content.map((item) => item.content)}
            />
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
                    onChange={(event: any) => {
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
        <ReflexElement minSize={120} size={120}>
          <TimeLineContainer contents={content} />
        </ReflexElement>
        <ReflexSplitter />
        <ReflexElement className="right-pane">
          {content.map((value, index) => {
            return (
              <HStack key={value.uuid}>
                <Text>{index + 1}</Text>
                <Stack w="170px">
                  <Editable
                    defaultValue={miliToString(value.content.startTime!)}
                  >
                    <EditablePreview />
                    <EditableInput />
                  </Editable>
                  <Editable defaultValue={miliToString(value.content.endTime!)}>
                    <EditablePreview />
                    <EditableInput />
                  </Editable>
                </Stack>
                <Textarea
                  noOfLines={2}
                  value={value.content.toText()}
                  onChange={(event: any) => {
                    content[index].content.textArray =
                      event.target.value.split("\n");
                    setContents(content);
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
          <HStack>
            <Button
              onClick={() => {
                const newItem = {
                  uuid: uuidv4(),
                  content: new SRTContent(
                    content.length.toString(),
                    "00:00:00,000 --> 00:00:00,000",
                    []
                  ),
                };
                setContents((prevContents) => [...prevContents, newItem]);
              }}
            >
              자막 추가
            </Button>
            <SelectTheme isLarge={true} />
          </HStack>
        </ReflexElement>
      </ReflexContainer>
    </TimeLineProvider>
  );
}

Editor.options = {
  auth: false,
  hideTitle: true,
  hideFooter: true,
} as PageOptions;
