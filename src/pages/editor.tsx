import { ReflexContainer, ReflexElement, ReflexSplitter } from "react-reflex";
import { PageOptions } from "../utils/types";
import "react-reflex/styles.css";
import {
  Box,
  Button,
  Divider,
  Editable,
  EditableInput,
  EditablePreview,
  FormControl,
  Heading,
  HStack,
  IconButton,
  Input,
  Stack,
  Text,
  Textarea,
  useColorMode,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import {
  createContext,
  FormEvent,
  SetStateAction,
  useCallback,
  useContext,
  useState,
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

type EditorContextProps = {
  /// The left time in milliseconds
  leftTime: number;
  /// The right time in milliseconds
  rightTime: number;
  changeLRTime: (left: number, right: number) => void;
  contents: contentArray[];
  setContents: (
    newContentsFromPrev: (prevContents: SRTContent[]) => SRTContent[]
  ) => void;
};

export const EditorContext = createContext<EditorContextProps>({
  leftTime: 0,
  rightTime: 1000 * 10,
  changeLRTime: (_, __) => {},
  contents: [],
  setContents: (_) => {},
});

type EditorProviderProps = {
  children: React.ReactNode;
};

function EditorProvider({ children }: EditorProviderProps) {
  const [leftTime, setLeftTime] = useState<number>(0);
  const [rightTime, setRightTime] = useState<number>(1000 * 10);
  const [contents, setContents] = useState<contentArray[]>([]);

  return (
    <EditorContext.Provider
      value={{
        leftTime,
        rightTime,
        changeLRTime: (left, right) => {
          setLeftTime(left);
          setRightTime(right);
        },
        contents,
        setContents: (newContents) => {
          return setContents(
            newContents(contents.map((content) => content.content)).map(
              (content: any) => ({ uuid: uuidv4(), content })
            )
          );
        },
      }}
    >
      {children}
    </EditorContext.Provider>
  );
}

function EditorWithoutContext() {
  const router = useRouter();
  const toast = useToast();
  const [youtubeId, setYoutubeId] = useState(router.query.youtubeId as string);
  const [urlInput, setUrlInput] = useState("");

  const { contents, setContents } = useContext(EditorContext);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      acceptedFiles[0].text().then((text) => {
        const srtFile = SRTFile.fromText(text);
        setContents(() => srtFile.array);
      });
    },
    [setContents]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  useHotkeys("tab", () => console.log("sex"), {
    filterPreventDefault: true,
    enableOnContentEditable: true,
  });

  function downloadSRT() {
    const srtFile = new SRTFile();
    srtFile.array = contents.map((item) => item.content);
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
      style={{ width: "100vw", height: "calc(100vh - 54px)" }}
      orientation="horizontal"
    >
      <ReflexElement minSize={100}>
        <ReflexContainer
          style={{ width: "100%", minHeight: "100px" }}
          orientation="vertical"
        >
          <ReflexElement minSize={500} style={{ width: "calc(100vw - 800px)" }}>
            <YoutubeWithSub
              youtubeId={youtubeId}
              contents={contents.map((item) => item.content)}
            />
          </ReflexElement>
          <ReflexSplitter propagate={true} />
          <ReflexElement minSize={250} size={400}>
            <Stack>
              <Heading
                fontSize="lg"
                bg={useColorModeValue("gray.100", "gray.700")}
                w="100%"
                borderBottomWidth="2px"
                p="5px"
                textAlign="center"
              >
                자막 업로드 및 내보내기
              </Heading>
              <Stack p="10px" mt="0px !important" spacing="10px">
                <Box
                  h="100px"
                  borderWidth="1px"
                  borderRadius="6px"
                  {...getRootProps()}
                  bg={useColorModeValue(
                    isDragActive ? "blue.100" : "blue.50",
                    isDragActive ? "blue.800" : "blue.900"
                  )}
                  p="15px"
                >
                  <input {...getInputProps()} />
                  {isDragActive ? (
                    <p>파일을 여기에 놓으세요</p>
                  ) : (
                    <p>클릭하거나 드래그 앤 드롭으로 자막을 업로드 하세요</p>
                  )}
                </Box>
                <Button onClick={downloadSRT} colorScheme="blue">
                  Save to SRT
                </Button>
              </Stack>
              <Heading
                fontSize="lg"
                bg={useColorModeValue("gray.100", "gray.700")}
                w="100%"
                borderBottomWidth="2px"
                borderTopWidth="2px"
                p="5px"
                textAlign="center"
              >
                동영상 변경
              </Heading>
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
                <Stack p="10px" spacing="10px">
                  <FormControl>
                    <Input
                      type="url"
                      id="url"
                      value={urlInput}
                      onChange={(event: any) => {
                        setUrlInput(event.target.value);
                      }}
                      placeholder="변경할 url 입력"
                    />
                  </FormControl>
                  <Button type="submit" colorScheme="blue">
                    변경
                  </Button>
                </Stack>
              </form>
            </Stack>
          </ReflexElement>
          <ReflexSplitter propagate={true} />
          <ReflexElement minSize={350} size={400}>
            <Shortcuts />
          </ReflexElement>
        </ReflexContainer>
      </ReflexElement>
      <ReflexSplitter propagate={true} />
      <ReflexElement minSize={120} size={120} maxSize={200}>
        <TimeLineContainer />
      </ReflexElement>
      <ReflexSplitter propagate={true} />
      <ReflexElement className="right-pane" size={400}>
        <HStack maxH="100%" h="100%">
          <Stack
            h="100%"
            w="180px"
            bg={useColorModeValue("gray.100", "gray.700")}
            p="20px"
            alignItems="center"
            spacing="20px"
          >
            <Button
              onClick={() => {
                const newItem = new SRTContent(
                  contents.length.toString(),
                  "00:00:00,000 --> 00:00:00,000",
                  []
                );
                setContents((prevContents) => [...prevContents, newItem]);
              }}
              colorScheme="blue"
            >
              자막 추가
            </Button>
            <Button
              onClick={() => {
                setContents(() => []);
              }}
              colorScheme="blue"
            >
              Delete all
            </Button>
            <SelectTheme isLarge={true} />
          </Stack>
          <Stack
            h="100%"
            maxH="100%"
            overflowY="scroll"
            overflowX="hidden"
            w="full"
          >
            {contents.map((value, index) => {
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
                    <Editable
                      defaultValue={miliToString(value.content.endTime!)}
                    >
                      <EditablePreview />
                      <EditableInput />
                    </Editable>
                  </Stack>
                  <Textarea
                    noOfLines={2}
                    value={value.content.toText()}
                    onChange={(event: any) => {
                      contents[index].content.textArray =
                        event.target.value.split("\n");
                      setContents((prev: SRTContent[]): SRTContent[] => [
                        ...prev,
                      ]);
                    }}
                  />
                  <IconButton
                    aria-label="Delete subtitle"
                    icon={<DeleteIcon />}
                    onClick={() => {
                      setContents((prevContents: any) => [
                        ...prevContents.slice(0, index),
                        ...prevContents.slice(index + 1),
                      ]);
                    }}
                  />
                </HStack>
              );
            })}
          </Stack>
        </HStack>
      </ReflexElement>
    </ReflexContainer>
  );
}

export default function Editor() {
  return (
    <EditorProvider>
      <EditorWithoutContext />
    </EditorProvider>
  );
}

Editor.options = {
  auth: false,
  hideTitle: true,
  hideFooter: true,
} as PageOptions;
