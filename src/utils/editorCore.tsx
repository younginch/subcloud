import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  keyframes,
  useDisclosure,
  useToast,
  Text,
} from "@chakra-ui/react";
import { EditorFile } from "@prisma/client";
import { SRTContent, SRTFile } from "@younginch/subtitle";
import axios from "axios";
import { useRouter } from "next/router";
import { createContext, RefObject, useEffect, useRef, useState } from "react";
import { KeyMap } from "react-hotkeys";
import { FixedSizeList } from "react-window";
import { YouTubePlayer } from "react-youtube";
import EditorAction, {
  CreateAction,
  EditTimeAction,
  SplitAction,
} from "./editorActions";

export function checkOccupation(contents: SRTContent[], time: number): number {
  if (Number.isNaN(time)) return -1;
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < contents.length; i++) {
    if (contents[i].startTime <= time && contents[i].endTime >= time) return i;
  }
  return -1;
}

export function findPosition(contents: SRTContent[], time: number): number {
  if (Number.isNaN(time)) return -1;

  if (contents.length === 0) return 0;
  if (time < contents[0].startTime) return 0;
  if (time > contents[contents.length - 1].endTime) return contents.length;
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < contents.length - 1; i++) {
    if (contents[i].endTime < time && contents[i + 1].startTime > time)
      return i + 1;
  }
  return -1;
}

export function makeLeftAnimation(
  left: number,
  right: number,
  time: number
): string {
  const changeLeft = keyframes`
  0% {
    left: ${left}px;
  }
  100% {
    left: ${right}px;
  }
  `;
  return `${time}s ${changeLeft} linear`;
}

type EditorContextProps = {
  /// The left time in milliseconds
  leftTime: number;
  /// The right time in milliseconds
  rightTime: number;
  changeLRTime: (left: number, right: number) => void;
  contents: SRTContent[];
  setContents: (contents: SRTContent[]) => void;
  focusedIndex: number;
  setFocusedIndex: (index: number) => void;
  focusContent: (index: number) => void;
  setRefArray: (
    refArray: RefObject<FixedSizeList<RefObject<HTMLDivElement>[]>>
  ) => void;
  id: string;
  setId: (id: string) => void;
  setPlayer: (player: YouTubePlayer) => void;
  getPlayerTime: () => number;
  setPlayerTime: (time: number) => void;
  state: PlayerState;
  setState: (state: PlayerState) => void;
  duration: number;
  aspectRatio: number;
  shouldRerender: boolean;
  forceRerender: () => void;
  commandKeys: KeyMap;
  commandHandlers: { [key: string]: () => void };
  execute: (actions: EditorAction) => void;
  showTimeline: boolean;
  showProperty: boolean;
  setUrlInput: (urlInput: RefObject<HTMLInputElement>) => void;
};

export enum PlayerState {
  UNSTARTED = -1,
  ENDED = 0,
  PLAYING = 1,
  PAUSED = 2,
  BUFFERING = 3,
  CUED = 5,
}

const commandKeys = {
  FILE_NEW_WINDOW: ["option+n"],
  FILE_OPEN_YOUTUBE: ["option+shift+o"],
  FILE_OPEN_SUBFILE: ["option+o"],
  FILE_SAVE: ["option+s"],
  EDIT_UNDO: ["option+z"],
  EDIT_REDO: ["option+y"],
  PLAY_PAUSE: ["space"],
  NEW_SUBTITLE: ["["],
  CUT_SUBTITLE: ["]"],
  SPLIT_SUBTITLE: ["\\", "/"],
  LEFT_0_5: ["left"],
  RIGHT_0_5: ["right"],
  LEFT_5: ["shift+left"],
  RIGHT_5: ["shift+right"],
  DELETE_ALL: ["command", "backspace"],
};

export const EditorContext = createContext<EditorContextProps>({
  /* The left time in milliseconds
   */
  leftTime: 0,
  rightTime: 100 * 1000,
  changeLRTime: () => {},
  contents: [],
  setContents: () => {},
  focusedIndex: 0,
  setFocusedIndex: () => {},
  focusContent: () => {},
  setRefArray: () => {},
  id: "",
  setId: () => {},
  setPlayer: () => {},
  getPlayerTime: () => 0,
  setPlayerTime: () => {},
  state: PlayerState.UNSTARTED,
  setState: () => {},
  duration: 0,
  aspectRatio: 0,
  shouldRerender: true,
  forceRerender: () => {},
  commandKeys,
  commandHandlers: {},
  execute: () => {},
  showTimeline: true,
  showProperty: true,
  setUrlInput: () => {},
});

type EditorProviderProps = {
  children: React.ReactNode;
};

export function EditorProvider({ children }: EditorProviderProps) {
  const toast = useToast();
  const [leftTime, setLeftTime] = useState<number>(-20 * 1000);
  const [rightTime, setRightTime] = useState<number>(40 * 1000);
  const [contents, setContents] = useState<SRTContent[]>([]);
  const [focusedIndex, setFocusedIndex] = useState<number>(0);
  const [refArray, setRefArray] =
    useState<RefObject<FixedSizeList<RefObject<HTMLDivElement>[]>>>();
  const [id, setId] = useState<string>("");
  const [player, setPlayer] = useState<YouTubePlayer>();
  const [duration, setDuration] = useState<number>(10 * 60 * 1000);
  const [videoFraction, setVideoFraction] = useState<number>(0);
  const [playerState, setPlayerState] = useState<PlayerState>(
    PlayerState.UNSTARTED
  );
  const [rerenderIndicator, setRerenderIndicator] = useState<boolean>(true);
  const [undoActions, setUndoActions] = useState<EditorAction[]>([]);
  const [redoActions, setRedoActions] = useState<EditorAction[]>([]);

  const [showTimeline, setShowTimeline] = useState<boolean>(true);
  const [showProperty, setShowProperty] = useState<boolean>(true);

  const [urlInput, setUrlInput] = useState<RefObject<HTMLInputElement>>();

  function execute(action: EditorAction) {
    setContents(() => action.execute(contents));

    const newUndoStack = [...undoActions];
    newUndoStack.push(action);
    setUndoActions(newUndoStack);
    setRedoActions([]);
  }

  function undo() {
    if (undoActions.length > 0) {
      const action = undoActions[undoActions.length - 1];
      if (action) {
        setContents(() => action.undo(contents));
        const newUndoStack = [...undoActions];
        newUndoStack.pop();
        setUndoActions(newUndoStack);
        const newRedoStack = [...redoActions];
        newRedoStack.push(action);
        setRedoActions(newRedoStack);
      }
    }
  }

  function redo() {
    if (redoActions.length > 0) {
      const action = redoActions.pop();
      if (action) {
        setContents(() => action.execute(contents));
        const newUndoStack = [...undoActions];
        newUndoStack.push(action);
        setUndoActions(newUndoStack);
      }
    }
  }

  function getPlayerTime() {
    return (player?.getCurrentTime() ?? 0) * 1000;
  }

  function playOrPause() {
    if (playerState === PlayerState.PLAYING) {
      player?.pauseVideo();
    } else if (playerState === PlayerState.PAUSED) {
      player?.playVideo();
    }
  }

  function setPlayerTime(time: number) {
    player?.seekTo(time / 1000, true);
  }

  function rerenderWithTimeout() {
    setTimeout(() => {
      setRerenderIndicator(!rerenderIndicator);
    }, 100);
  }

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

  const { isOpen, onOpen, onClose } = useDisclosure();

  type CommandHandlers = {
    [key: string]: () => void;
  };

  const commandHandlers: CommandHandlers = {
    FILE_NEW_WINDOW: () => window.open(window.location.href, "_blank"),
    FILE_OPEN_YOUTUBE: () => {
      urlInput?.current?.focus();
    },
    FILE_SAVE_SRT: downloadSRT,
    EDIT_UNDO: undo,
    EDIT_REDO: redo,
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
      const newIndex = findPosition(contents, getPlayerTime());
      if (newIndex === -1) return;

      const endTime =
        newIndex === contents.length ? duration : contents[newIndex].startTime;
      newItem.startTime = getPlayerTime();
      newItem.endTime = Math.min(newItem.startTime + 5 * 1000, endTime); // default 5 seconds

      execute(new CreateAction(newIndex, newItem));
      setRerenderIndicator(!rerenderIndicator);
    },
    CUT_SUBTITLE: () => {
      const index = checkOccupation(contents, getPlayerTime());
      if (index === -1) return;

      execute(new EditTimeAction(index, "end", getPlayerTime()));
      setRerenderIndicator(!rerenderIndicator);
    },
    SPLIT_SUBTITLE: () => {
      const index = checkOccupation(contents, getPlayerTime());
      if (index === -1) return;

      execute(new SplitAction(index, getPlayerTime()));
      setRerenderIndicator(!rerenderIndicator);
    },
    LEFT_0_5: () => {
      setPlayerTime(Math.max(getPlayerTime() - 500, 0));
      rerenderWithTimeout();
    },
    RIGHT_0_5: () => {
      setPlayerTime(Math.min(getPlayerTime() + 500, duration));
      rerenderWithTimeout();
    },
    LEFT_5: () => {
      setPlayerTime(Math.max(getPlayerTime() - 5000, 0));
      rerenderWithTimeout();
    },
    RIGHT_5: () => {
      setPlayerTime(Math.min(getPlayerTime() + 5000, duration));
      rerenderWithTimeout();
    },
    DELETE_ALL: () => {
      setContents([]);
      setFocusedIndex(-1);
    },
    GOTO_TIMELINE: () => {
      let newLeft =
        contents[focusedIndex].startTime - (4 * (rightTime - leftTime)) / 9;
      let newRight =
        contents[focusedIndex].startTime + (5 * (rightTime - leftTime)) / 9;

      if (newLeft < 0) {
        newLeft = 0;
        newRight = rightTime - leftTime;
      }
      if (newRight > duration) {
        newRight = duration;
        newLeft = duration - (rightTime - leftTime);
      }

      setLeftTime(newLeft);
      setRightTime(newRight);
    },
    TOGGLE_TIMELINE: () => {
      setShowTimeline(!showTimeline);
    },
    TOGGLE_SUBTITLE_PROPERTIES: () => {
      setShowProperty(!showProperty);
    },
    GOTO_FOCUSED_CONTENT: () => {
      refArray?.current?.scrollToItem(focusedIndex);
    },
    CLOUD_OPEN: () => {},
    CLOUD_SAVE: async () => {
      try {
        const srtFile = new SRTFile();
        srtFile.array = contents;
        const formData = new FormData();
        formData.append("file", srtFile.toText());
        const fileRes = await axios.post("/api/user/file/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        await axios.patch("/api/session/editor", {
          fileId: fileRes.data.id,
        });
      } catch (e: any) {
        toast({
          title: "Failed to save file",
          description: e.toString(),
          status: "error",
        });
      }
    },
    CLOUD_FILE_INFO: () => {
      onOpen();
    },
  };

  const cancelRef = useRef(null);
  const router = useRouter();
  const [editorFile, setEditorFile] = useState<EditorFile>();

  useEffect(() => {
    if (!router.query.id) {
      return;
    }
    axios
      .get(`/api/session/editor?id=${router.query.id}`)
      .then((res) => {
        setId(res.data.sub.videoId);
        setEditorFile(res.data);
        axios
          .get(res.data.fileUrl, { responseType: "blob" })
          .then((res) => {
            res.data.text().then((text: string) => {
              const srt = SRTFile.fromText(text);
              setContents(srt.array);
            });
          })
          .catch((err) => {
            toast({
              title: "File download failed",
              description: err.message,
              status: "error",
            });
          });
      })
      .catch((err) => {
        toast({
          title: "Load info failed",
          description: err.message,
          status: "error",
        });
      });
  }, []);

  return (
    <EditorContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
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
        focusContent: (index) => {
          refArray?.current?.scrollToItem(index);
          setFocusedIndex(index);
        },
        setRefArray: (refArray) => {
          setRefArray(refArray);
        },
        id,
        setId: (newId) => {
          setId(newId);
        },
        setPlayer: (newPlayer) => {
          setPlayer(newPlayer);
          setDuration(newPlayer.getDuration() * 1000);
          const initialTime = Math.min(newPlayer.getDuration() * 1000, 20000);
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
        getPlayerTime,
        setPlayerTime,
        duration,
        aspectRatio: videoFraction,
        state: playerState,
        setState: (newState) => {
          setPlayerState(newState);
          if (newState === PlayerState.PLAYING) {
            player?.playVideo();
          } else if (newState === PlayerState.PAUSED) {
            player?.pauseVideo();
          }
        },
        shouldRerender: rerenderIndicator,
        forceRerender: () => {
          setTimeout(() => {
            setRerenderIndicator(!rerenderIndicator);
          }, 100);
        },
        commandKeys,
        commandHandlers,
        execute,
        showTimeline,
        showProperty,
        setUrlInput,
      }}
    >
      {children}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              File Infomation
            </AlertDialogHeader>

            <AlertDialogBody>
              <Text fontSize="md">{editorFile?.id}</Text>
              <Text fontSize="md">{editorFile?.subId}</Text>
              <Text fontSize="md">
                {editorFile?.createdAt.toLocaleString()}
              </Text>
              <Text fontSize="md">
                {editorFile?.updatedAt.toLocaleString()}
              </Text>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Close
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </EditorContext.Provider>
  );
}
