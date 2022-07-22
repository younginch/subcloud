import {
  AddIcon,
  ExternalLinkIcon,
  RepeatIcon,
  EditIcon,
  ChevronDownIcon,
  DeleteIcon,
} from "@chakra-ui/icons";
import {
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import { useContext } from "react";
import { KeySequence } from "react-hotkeys";
import { EditorContext } from "../../utils/editorCore";

function keysToString(sequence: KeySequence) {
  let array: string[] = [];
  if (Array.isArray(sequence)) {
    if ((sequence as string[])[0].includes("+")) {
      array = (sequence as string[])[0].split("+");
    } else {
      array = sequence as string[];
    }
  } else {
    array = [sequence as string];
  }

  return array
    .map((key) => {
      switch (key) {
        case "command":
          return "⌘";
        case "option":
          return "⌥";
        case "shift":
          return "⇧";
        case "control":
          return "⌃";
        case "left":
          return "←";
        case "right":
          return "→";
        case "backspace":
          return "⌫";
        default:
          return key;
      }
    })
    .join("");
}

type EditorMenuProps = {
  title: string;
  items: {
    title: string;
    icon?: React.ReactElement;
    command: string;
  }[];
};

function EditorMenu({ title, items }: EditorMenuProps) {
  const { commandKeys, commandHandlers } = useContext(EditorContext);

  const menuBg = useColorModeValue("#dddddd", "#3a3a3a");

  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<ChevronDownIcon />}
        variant="ghost"
        borderRadius={0}
        fontSize="12px"
        h="100%"
      >
        {title}
      </MenuButton>
      <MenuList zIndex={200} bg={menuBg} borderRadius={0} p={0}>
        {items.map((item) => (
          <MenuItem
            key={item.title}
            icon={item.icon}
            command={keysToString(commandKeys[item.command])}
            onClick={commandHandlers[item.command]}
          >
            {item.title}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
}

export default function Menus() {
  const menuBg = useColorModeValue("#dddddd", "#3a3a3a");
  return (
    <HStack bg={menuBg} spacing={0} h="30px">
      <Link href="/" passHref>
        <Button variant="ghost" borderRadius={0} h="100%">
          SubCloud
        </Button>
      </Link>
      <EditorMenu
        title="파일(F)"
        items={[
          { title: "새 창", icon: <AddIcon />, command: "" },
          {
            title: "유튜브 동영상 열기...",
            icon: <ExternalLinkIcon />,
            command: "",
          },
          {
            title: "자막 파일 열기...",
            icon: <EditIcon />,
            command: "",
          },
          {
            title: "SRT 파일로 저장...",
            icon: <EditIcon />,
            command: "",
          },
        ]}
      />
      <EditorMenu
        title="편집(E)"
        items={[
          {
            title: "현재 시간에서 새 자막",
            icon: <AddIcon />,
            command: "NEW_SUBTITLE",
          },
          {
            title: "현재 시간에서 자막 끝내기",
            icon: <EditIcon />,
            command: "CUT_SUBTITLE",
          },
          {
            title: "모두 지우기",
            icon: <DeleteIcon />,
            command: "DELETE_ALL",
          },
          {
            title: "현재 커서에서 분리하기",
            icon: <RepeatIcon />,
            command: "SPLIT_SUBTITLE",
          },
        ]}
      />
      <EditorMenu
        title="보기(V)"
        items={[
          {
            title: "타임라인 보기/가리기",
            icon: <EditIcon />,
            command: "TOGGLE_TIMELINE",
          },
          {
            title: "자막 속성 보기/가리기",
            icon: <EditIcon />,
            command: "TOGGLE_SUBTITLE_PROPERTIES",
          },
        ]}
      />
      <EditorMenu
        title="재생(Y)"
        items={[
          {
            title: "재생/일시정지",
            icon: <EditIcon />,
            command: "PLAY_PAUSE",
          },
          {
            title: "0.5초 되감기",
            icon: <EditIcon />,
            command: "LEFT_0_5",
          },
          {
            title: "5초 되감기",
            icon: <EditIcon />,
            command: "LEFT_5",
          },
          {
            title: "0.5초 빨리감기",
            icon: <EditIcon />,
            command: "RIGHT_0_5",
          },
          {
            title: "5초 빨리감기",
            icon: <EditIcon />,
            command: "RIGHT_5",
          },
        ]}
      />
    </HStack>
  );
}
