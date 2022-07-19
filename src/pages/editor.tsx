import { ReflexContainer, ReflexElement, ReflexSplitter } from "react-reflex";
import { PageOptions } from "../utils/types";
import "react-reflex/styles.css";
import {
  Box,
  Button,
  FormControl,
  Heading,
  HStack,
  Input,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Stack,
  useColorModeValue,
  useToast,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import {
  createContext,
  FormEvent,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { SRTContent, SRTFile } from "@younginch/subtitle";
import { useDropzone } from "react-dropzone";
import Shortcuts from "../components/editor/shortcuts";
import YoutubePlayer from "../components/editor/youtubePlayer";
import TimeLineContainer from "../components/editor/timeLineContainer";
import { YouTubePlayer } from "react-youtube";
import ToggleTheme from "../components/editor/toggleTheme";
import { MdDelete } from "react-icons/md";
import { FaPlus, FaSave } from "react-icons/fa";
import NoVideo from "../components/editor/noVideo";
import axios from "axios";
import EditArray from "../components/editor/editArray";
import Property from "../components/editor/property";
import { GlobalHotKeys } from "react-hotkeys";
import { BiHelpCircle } from "react-icons/bi";
import { useRouter } from "next/router";
import { checkOccupation, findPosition } from "../utils/editorCore";

type EditorContextProps = {
  /// The left time in milliseconds
  leftTime: number;
  /// The right time in milliseconds
  rightTime: number;
  changeLRTime: (left: number, right: number) => void;
  contents: SRTContent[];
  setContents: (newContents: SRTContent[]) => void;
  focusedIndex: number;
  setFocusedIndex: (index: number) => void;
  id: string;
  setId: (id: string) => void;
  setPlayer: (player: YouTubePlayer) => void;
  getPlayerTime: () => number;
  setPlayerTime: (time: number) => void;
  state: PlayerState;
  setState: (state: PlayerState) => void;
  playOrPause: () => void;
  duration: number;
  aspectRatio: number;
};

export enum PlayerState {
  UNSTARTED = -1,
  ENDED = 0,
  PLAYING = 1,
  PAUSED = 2,
  BUFFERING = 3,
  CUED = 5,
}

export const EditorContext = createContext<EditorContextProps>({
  /* The left time in milliseconds
   */
  leftTime: 0,
  rightTime: 100 * 1000,
  changeLRTime: (_, __) => {},
  contents: [],
  setContents: (_) => {},
  focusedIndex: 0,
  setFocusedIndex: (_) => {},
  id: "",
  setId: (_) => {},
  setPlayer: () => {},
  getPlayerTime: () => 0,
  setPlayerTime: (_) => {},
  state: PlayerState.UNSTARTED,
  setState: (_) => {},
  playOrPause: () => {},
  duration: 0,
  aspectRatio: 0,
});

type EditorProviderProps = {
  children: React.ReactNode;
};

function EditorProvider({ children }: EditorProviderProps) {
  const [leftTime, setLeftTime] = useState<number>(-15 * 1000);
  const [rightTime, setRightTime] = useState<number>(30 * 1000);
  const [contents, setContents] = useState<SRTContent[]>([]);
  const [focusedIndex, setFocusedIndex] = useState<number>(0);
  const [id, setId] = useState<string>("");
  const [player, setPlayer] = useState<YouTubePlayer>();
  const [duration, setDuration] = useState<number>(10 * 60 * 1000);
  const [videoFraction, setVideoFraction] = useState<number>(0);
  const [playerState, setPlayerState] = useState<PlayerState>(
    PlayerState.UNSTARTED
  );

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
          setContents(newContents);
        },
        focusedIndex,
        setFocusedIndex: (index) => {
          setFocusedIndex(index);
        },
        id,
        setId: (newId) => {
          setId(newId);
        },
        setPlayer: (newPlayer) => {
          setPlayer(newPlayer);
          setDuration(newPlayer.getDuration() * 1000);
          const initialTime = Math.min(newPlayer.getDuration() * 1000, 15000);
          setLeftTime(-initialTime);
          setRightTime(initialTime * 2);
          axios
            .get(
              `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${id}&format=json`
            )
            .then((res) => {
              setVideoFraction(res.data.width / res.data.height);
            });
        },
        getPlayerTime: () => {
          return player?.getCurrentTime() * 1000;
        },
        setPlayerTime: (time) => {
          player?.seekTo(time / 1000);
        },
        duration,
        aspectRatio: videoFraction,
        state: playerState,
        setState: (newState) => {
          setPlayerState(newState);
        },
        playOrPause: () => {
          if (playerState === PlayerState.PLAYING) {
            player?.pauseVideo();
          } else if (playerState === PlayerState.PAUSED) {
            player?.playVideo();
          }
        },
      }}
    >
      {children}
    </EditorContext.Provider>
  );
}

function EditorWithoutContext() {
  const toast = useToast();
  const [urlInput, setUrlInput] = useState("");
  const urlField = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (router.query.youtubeId) {
      setId(router.query.youtubeId as string);
    }
  }, []);

  const {
    contents,
    setContents,
    setFocusedIndex,
    id,
    setId,
    getPlayerTime,
    setPlayerTime,
    playOrPause,
    duration,
  } = useContext(EditorContext);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      acceptedFiles[0].text().then((text) => {
        const srtFile = SRTFile.fromText(text);
        setContents(
          srtFile.array.sort((left, right) => left.startTime - right.startTime)
        );
        setFocusedIndex(0);
      });
    },
    [setContents]
  );
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

  const headerBg = useColorModeValue("gray.100", "#18161d");

  const keyMap = {
    PLAY_PAUSE: ["space"],
    NEW_SUBTITLE: ["["],
    CUT_SUBTITLE: ["]"],
    SPLIT_SUBTITLE: ["\\", "/"],
    LEFT_0_5: ["left"],
    RIGHT_0_5: ["right"],
    DELETE_ALL: ["command", "backspace"],
  };

  const handlers = {
    PLAY_PAUSE: () => {
      playOrPause();
    },
    NEW_SUBTITLE: () => {
      if (checkOccupation(contents, getPlayerTime()) !== -1) return;

      const newItem = new SRTContent(
        contents.length.toString(),
        "00:00:00,000 --> 00:00:00,000",
        []
      );
      let newIndex = findPosition(contents, getPlayerTime());
      if (newIndex === -1) return;

      const endTime =
        newIndex === contents.length ? duration : contents[newIndex].startTime;
      newItem.startTime = getPlayerTime();
      newItem.endTime = Math.min(newItem.startTime + 5 * 1000, endTime); // default 5 seconds

      setContents([
        ...contents.slice(0, newIndex),
        newItem,
        ...contents.slice(newIndex),
      ]);
    },
    CUT_SUBTITLE: () => {
      const index = checkOccupation(contents, getPlayerTime());
      if (index === -1) return;

      const newContents = [...contents];
      newContents[index].endTime = getPlayerTime();
      setContents(newContents);
    },
    SPLIT_SUBTITLE: () => {
      const index = checkOccupation(contents, getPlayerTime());
      if (index === -1) return;

      const newItem = new SRTContent(
        contents.length.toString(),
        "00:00:00,000 --> 00:00:00,000",
        []
      );
      newItem.startTime = getPlayerTime();
      newItem.endTime = contents[index].endTime;
      newItem.textArray = contents[index].textArray;

      const newContents = [...contents];
      newContents[index].endTime = getPlayerTime();
      setContents([
        ...newContents.slice(0, index + 1),
        newItem,
        ...newContents.slice(index + 1),
      ]);
    },
    LEFT_0_5: () => {
      setPlayerTime(getPlayerTime() - 500 >= 0 ? getPlayerTime() - 500 : 0);
    },
    RIGHT_0_5: () => {
      setPlayerTime(getPlayerTime() + 500);
    },
    DELETE_ALL: () => {
      setContents([]);
      setFocusedIndex(-1);
    },
  };

  return (
    <GlobalHotKeys keyMap={keyMap} handlers={handlers} allowChanges={true}>
      <ReflexContainer
        style={{ width: "100vw", height: "calc(100vh - 54px)" }}
        orientation="horizontal"
      >
        <ReflexElement minSize={100}>
          <ReflexContainer orientation="vertical">
            <ReflexElement minSize={200} maxSize={500}>
              <Stack>
                <Heading
                  fontSize="lg"
                  bg={headerBg}
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
                  bg={headerBg}
                  w="100%"
                  borderBottomWidth="2px"
                  borderTopWidth="2px"
                  p="5px"
                  textAlign="center"
                >
                  {id.length === 0 ? "동영상 선택" : "동영상 변경"}
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
                        placeholder={
                          id.length === 0
                            ? "동영상 url 입력"
                            : "변경할 url 입력"
                        }
                        ref={urlField}
                      />
                    </FormControl>
                    <Button type="submit" colorScheme="blue" w="80px">
                      {id.length === 0 ? "선택" : "변경"}
                    </Button>
                  </Stack>
                </form>
              </Stack>
            </ReflexElement>
            <ReflexSplitter propagate={true} />
            <ReflexElement
              minSize={600}
              style={{ overflow: "hidden" }}
              size={1000}
            >
              {id.length === 0 ? (
                <NoVideo urlRef={urlField} />
              ) : (
                <YoutubePlayer id={id} />
              )}
            </ReflexElement>
            <ReflexSplitter propagate={true} />
            <ReflexElement minSize={300}>
              <Stack>
                <Heading
                  fontSize="lg"
                  bg={headerBg}
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
        <ReflexSplitter
          propagate={true}
          style={{
            height: "3px",
          }}
        />
        <ReflexElement size={400}>
          <ReflexContainer orientation="vertical">
            <ReflexElement>
              <HStack maxH="100%" h="100%" overflowY="hidden">
                <Stack
                  h="100%"
                  w="180px"
                  bg={headerBg}
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
                      if (contents.length === 0) {
                        newItem.startTime = 0;
                        newItem.endTime = 1000;
                      } else {
                        newItem.startTime =
                          contents[contents.length - 1].endTime;
                        newItem.endTime = Math.min(
                          duration,
                          newItem.startTime + 1000
                        );
                      }
                      setContents([...contents, newItem]);
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
                  <Tooltip label="Comming soon!">
                    <Button
                      rightIcon={<BiHelpCircle />}
                      colorScheme="blue"
                      isDisabled
                    >
                      How to use
                    </Button>
                  </Tooltip>
                  <Popover placement="right">
                    {({ onClose }) => (
                      <>
                        <PopoverTrigger>
                          <Button
                            rightIcon={<MdDelete />}
                            colorScheme="red"
                            w="full"
                          >
                            Delete all
                          </Button>
                        </PopoverTrigger>
                        <Portal>
                          <PopoverContent>
                            <PopoverArrow />
                            <PopoverHeader>Confirmation!</PopoverHeader>
                            <PopoverCloseButton />
                            <PopoverBody>
                              <Stack>
                                <Text>
                                  SRT파일로 저장하지 않으면 지금까지의
                                  수정사항을 전부 잃게 됩니다.
                                </Text>
                                <Button
                                  colorScheme="red"
                                  onClick={() => {
                                    setContents([]);
                                    onClose();
                                  }}
                                >
                                  자막 전체 삭제
                                </Button>
                              </Stack>
                            </PopoverBody>
                          </PopoverContent>
                        </Portal>
                      </>
                    )}
                  </Popover>
                  <ToggleTheme />
                </Stack>
                <EditArray />
              </HStack>
            </ReflexElement>
            <ReflexSplitter propagate={true} />
            <ReflexElement maxSize={300} minSize={100}>
              <Property />
            </ReflexElement>
          </ReflexContainer>
        </ReflexElement>
      </ReflexContainer>
    </GlobalHotKeys>
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
