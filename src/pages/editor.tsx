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
  Heading,
  HStack,
  IconButton,
  Input,
  Spacer,
  Stack,
  Text,
  Textarea,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import {
  createContext,
  FormEvent,
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
import YoutubeWithSub from "../components/editor/youtubeWithSub";
import { useHotkeys } from "react-hotkeys-hook";
import { useRouter } from "next/router";
import TimeLineContainer from "../components/editor/timeLineContainer";
import { YouTubePlayer } from "react-youtube";
import ToggleTheme from "../components/editor/toggleTheme";
import { MdDelete, MdTimer } from "react-icons/md";
import { FaPlus, FaSave } from "react-icons/fa";

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
  id: string;
  setId: (id: string) => void;
  setPlayer: (player: YouTubePlayer) => void;
  getPlayerTime: () => number;
  setPlayerTime: (time: number) => void;
  getVideoFraction: () => number;
};

export const EditorContext = createContext<EditorContextProps>({
  leftTime: 0,
  rightTime: 1000 * 10,
  changeLRTime: (_, __) => {},
  contents: [],
  setContents: (_) => {},
  id: "",
  setId: (_) => {},
  setPlayer: () => {},
  getPlayerTime: () => 0,
  setPlayerTime: (_) => {},
  getVideoFraction: () => 0,
});

type EditorProviderProps = {
  children: React.ReactNode;
};

function EditorProvider({ children }: EditorProviderProps) {
  const [leftTime, setLeftTime] = useState<number>(0);
  const [rightTime, setRightTime] = useState<number>(1000 * 10);
  const [contents, setContents] = useState<contentArray[]>([]);
  const [id, setId] = useState<string>("");
  const [player, setPlayer] = useState<YouTubePlayer>();

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
        id,
        setId: (newId) => {
          setId(newId);
        },
        setPlayer: (newPlayer) => {
          setPlayer(newPlayer);
        },
        getPlayerTime: () => {
          return player?.getDuration();
        },
        setPlayerTime: (time) => {
          player?.seekTo(time);
        },
        getVideoFraction: () => {
          return player?.getVideoLoadedFraction();
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
  const [urlInput, setUrlInput] = useState("");

  const { contents, setContents, id, setId } = useContext(EditorContext);

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
        <ReflexContainer orientation="vertical">
          <ReflexElement minSize={600}>
            <YoutubeWithSub id={id} />
          </ReflexElement>
          <ReflexSplitter propagate={true} />
          <ReflexElement minSize={200} maxSize={400}>
            <Stack>
              <Heading
                fontSize="lg"
                bg={useColorModeValue("gray.100", "#18161d")}
                w="100%"
                borderBottomWidth="2px"
                p="5px"
                textAlign="center"
              >
                자막 업로드
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
                  _hover={{
                    bg: useColorModeValue("blue.100", "blue.800"),
                  }}
                  p="15px"
                  cursor="pointer"
                >
                  <input {...getInputProps()} />
                  {isDragActive ? (
                    <p>파일을 여기에 놓으세요</p>
                  ) : (
                    <p>클릭하거나 드래그 앤 드롭으로 자막을 업로드 하세요</p>
                  )}
                </Box>
              </Stack>
              <Heading
                fontSize="lg"
                bg={useColorModeValue("gray.100", "#18161d")}
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
                    setId(id);
                    toast({
                      title: "동영상 변경 완료",
                      description: "동영상이 변경되었습니다",
                      status: "success",
                    });
                  } catch {
                    toast({
                      title: "Error (URL)",
                      description: "Invalid URL",
                      status: "error",
                    });
                  }
                }}
              >
                <Stack p="10px" spacing="10px" alignItems="center">
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
                  <Button type="submit" colorScheme="blue" w="80px">
                    변경
                  </Button>
                </Stack>
              </form>
            </Stack>
          </ReflexElement>
          <ReflexSplitter propagate={true} />
          <ReflexElement minSize={300}>
            <Stack>
              <Heading
                fontSize="lg"
                bg={useColorModeValue("gray.100", "#18161d")}
                w="100%"
                borderBottomWidth="2px"
                p="5px"
                textAlign="center"
              >
                단축키
              </Heading>
              <Shortcuts />
            </Stack>
          </ReflexElement>
        </ReflexContainer>
      </ReflexElement>
      <ReflexSplitter propagate={true} />
      <ReflexElement
        minSize={100}
        size={120}
        maxSize={200}
        style={{ overflow: "hidden" }}
      >
        <TimeLineContainer />
      </ReflexElement>
      <ReflexSplitter propagate={true} />
      <ReflexElement className="right-pane" size={400}>
        <HStack maxH="100%" h="100%" overflowY="hidden">
          <Stack
            h="100%"
            w="180px"
            bg={useColorModeValue("gray.100", "#18161d")}
            p="20px"
            alignItems="center"
            spacing="20px"
          >
            <Button
              rightIcon={<FaPlus />}
              onClick={() => {
                const newItem = new SRTContent(
                  contents.length.toString(),
                  "00:00:00,000 --> 00:00:00,000",
                  []
                );
                setContents((prevContents) => [...prevContents, newItem]);
              }}
              colorScheme="blue"
              w="full"
            >
              자막 추가
            </Button>
            <Button
              rightIcon={<FaSave />}
              onClick={downloadSRT}
              colorScheme="blue"
            >
              Save to SRT
            </Button>
            <Button
              rightIcon={<MdDelete />}
              onClick={() => {
                setContents(() => []);
              }}
              colorScheme="red"
              w="full"
            >
              Delete all
            </Button>
            <ToggleTheme />
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
                  <Stack w="200px" minW="200px" ml="15px !important">
                    <HStack>
                      <Text>시작 시간</Text>
                      <Spacer />
                      <Editable
                        defaultValue={miliToString(value.content.startTime!)}
                        maxW="100px"
                      >
                        <EditablePreview />
                        <EditableInput />
                      </Editable>
                      <MdTimer />
                    </HStack>
                    <HStack>
                      <Text>끝 시간</Text>
                      <Spacer />
                      <Editable
                        defaultValue={miliToString(value.content.endTime!)}
                        maxW="100px"
                      >
                        <EditablePreview />
                        <EditableInput />
                      </Editable>
                      <MdTimer />
                    </HStack>
                  </Stack>
                  <Textarea
                    noOfLines={2}
                    value={value.content.textArray.reduce(
                      (acc, cur) => `${acc} \r\n${cur}`,
                      ""
                    )}
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
