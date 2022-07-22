import { keyframes } from "@chakra-ui/react";
import { SRTContent } from "@younginch/subtitle";
import axios from "axios";
import { createContext, useState } from "react";
import { KeyMap } from "react-hotkeys";
import { YouTubePlayer } from "react-youtube";
import EditorAction from "./editorActions";

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
  duration: number;
  aspectRatio: number;
  forceRerender: boolean;
  commandKeys: KeyMap;
  commandHandlers: { [key: string]: () => void };
  execute: (actions: EditorAction) => void;
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
  EDIT_UNDO: ["shift+z"],
  EDIT_REDO: ["shift+y"],
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
  id: "",
  setId: () => {},
  setPlayer: () => {},
  getPlayerTime: () => 0,
  setPlayerTime: () => {},
  state: PlayerState.UNSTARTED,
  setState: () => {},
  duration: 0,
  aspectRatio: 0,
  forceRerender: true,
  commandKeys,
  commandHandlers: {},
  execute: () => {},
});

type EditorProviderProps = {
  children: React.ReactNode;
};

export function EditorProvider({ children }: EditorProviderProps) {
  const [leftTime, setLeftTime] = useState<number>(-20 * 1000);
  const [rightTime, setRightTime] = useState<number>(40 * 1000);
  const [contents, setContents] = useState<SRTContent[]>([]);
  const [focusedIndex, setFocusedIndex] = useState<number>(0);
  const [id, setId] = useState<string>("");
  const [player, setPlayer] = useState<YouTubePlayer>();
  const [duration, setDuration] = useState<number>(10 * 60 * 1000);
  const [videoFraction, setVideoFraction] = useState<number>(0);
  const [playerState, setPlayerState] = useState<PlayerState>(
    PlayerState.UNSTARTED
  );
  const [forceRerender, setForceRerender] = useState<boolean>(true);
  const [undoActions, setUndoActions] = useState<EditorAction[]>([]);
  const [redoActions, setRedoActions] = useState<EditorAction[]>([]);

  function execute(action: EditorAction) {
    action.execute();

    const newUndoStack = [...undoActions];
    newUndoStack.push(action);
    setUndoActions(newUndoStack);
    setRedoActions([]);
  }

  function undo() {
    if (undoActions.length > 0) {
      const action = undoActions[undoActions.length - 1];
      if (action) {
        action.undo();
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
        action.execute();
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
    player?.seekTo(time / 1000);
  }

  const commandHandlers = {
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

      setContents([
        ...contents.slice(0, newIndex),
        newItem,
        ...contents.slice(newIndex),
      ]);
      setForceRerender(!forceRerender);
    },
    CUT_SUBTITLE: () => {
      const index = checkOccupation(contents, getPlayerTime());
      if (index === -1) return;

      const newContents = [...contents];
      newContents[index].endTime = getPlayerTime();
      setContents(newContents);
      setForceRerender(!forceRerender);
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
      setForceRerender(!forceRerender);
    },
    LEFT_0_5: () => {
      setPlayerTime(Math.max(getPlayerTime() - 500, 0));
      setForceRerender(!forceRerender);
    },
    RIGHT_0_5: () => {
      setPlayerTime(Math.min(getPlayerTime() + 500, duration));
      setForceRerender(!forceRerender);
    },
    LEFT_5: () => {
      setPlayerTime(Math.max(getPlayerTime() - 5000, 0));
      setForceRerender(!forceRerender);
    },
    RIGHT_5: () => {
      setPlayerTime(Math.min(getPlayerTime() + 5000, duration));
      setForceRerender(!forceRerender);
    },
    DELETE_ALL: () => {
      setContents([]);
      setFocusedIndex(-1);
    },
  };

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
        forceRerender,
        commandKeys,
        commandHandlers,
        execute,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
}
