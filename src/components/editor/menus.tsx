import {
  AddIcon,
  ExternalLinkIcon,
  RepeatIcon,
  EditIcon,
  ChevronDownIcon,
} from "@chakra-ui/icons";
import {
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import Link from "next/link";
import { useContext } from "react";
import { KeySequence } from "react-hotkeys";
import { EditorContext } from "../../utils/editorCore";

function keysToString(sequence: KeySequence) {
  let array: string[] = [];
  if (!Array.isArray(sequence)) {
    array = [sequence as string];
  } else {
    array = sequence as string[];
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

  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
        {title}
      </MenuButton>
      <MenuList zIndex={200}>
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
  const { commandKeys, commandHandlers } = useContext(EditorContext);

  return (
    <HStack>
      <Link href="/" passHref>
        <Button variant="ghost">SubCloud</Button>
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
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          편집(E)
        </MenuButton>
        <MenuList zIndex={200}>
          <MenuItem
            icon={<AddIcon />}
            command={keysToString(commandKeys.NEW_SUBTITLE)}
            onClick={commandHandlers.NEW_SUBTITLE}
          >
            현재 시간에서 새 자막
          </MenuItem>
          <MenuItem
            icon={<EditIcon />}
            command={keysToString(commandKeys.CUT_SUBTITLE)}
            onClick={commandHandlers.CUT_SUBTITLE}
          >
            현재 시간에서 자막 끝내기
          </MenuItem>
          <MenuItem
            icon={<ExternalLinkIcon />}
            command={keysToString(commandKeys.DELETE_ALL)}
            onClick={commandHandlers.DELETE_ALL}
          >
            모두 지우기
          </MenuItem>
          <MenuItem icon={<RepeatIcon />} command="\">
            현재 커서에서 자르기
          </MenuItem>
        </MenuList>
      </Menu>
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          보기(V)
        </MenuButton>
        <MenuList zIndex={200}>
          <MenuItem icon={<AddIcon />} command="⌘T">
            타임라인 보기
          </MenuItem>
          <MenuItem icon={<ExternalLinkIcon />} command="⌘N">
            자막 속성 보기
          </MenuItem>
        </MenuList>
      </Menu>
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
          재생(Y)
        </MenuButton>
        <MenuList zIndex={200}>
          <MenuItem icon={<AddIcon />} command="space">
            재생/일시정지
          </MenuItem>
          <MenuItem icon={<ExternalLinkIcon />} command="←">
            0.5초 되감기
          </MenuItem>
          <MenuItem icon={<RepeatIcon />} command="⇧←">
            5초 되감기
          </MenuItem>
          <MenuItem icon={<EditIcon />} command="→">
            0.5초 빨리감기
          </MenuItem>
          <MenuItem icon={<EditIcon />} command="⇧→">
            5초 빨리감기
          </MenuItem>
        </MenuList>
      </Menu>
    </HStack>
  );
}
