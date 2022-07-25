import {
  AddIcon,
  ExternalLinkIcon,
  RepeatIcon,
  EditIcon,
  ChevronDownIcon,
  DeleteIcon,
} from "@chakra-ui/icons";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useContext, useRef } from "react";
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

function HomeAlertDialog() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  return (
    <>
      <Button variant="ghost" borderRadius={0} h="100%" onClick={onOpen}>
        SubCloud
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              홈 화면으로 돌아가기
            </AlertDialogHeader>

            <AlertDialogBody>
              현재 저장하지 않은 내용은 모두 삭제됩니다.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                취소
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  onClose();
                  router.push("/");
                }}
                ml={3}
              >
                돌아가기
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default function Menus() {
  const { t } = useTranslation("editor");
  const menuBg = useColorModeValue("#dddddd", "#3a3a3a");
  return (
    <HStack bg={menuBg} spacing={0} h="30px">
      <HomeAlertDialog />
      <EditorMenu
        title={t("file")}
        items={[
          { title: t("new_page"), icon: <AddIcon />, command: "" },
          {
            title: t("open_youtube"),
            icon: <ExternalLinkIcon />,
            command: "",
          },
          {
            title: t("open_subFile"),
            icon: <EditIcon />,
            command: "",
          },
          {
            title: t("save_srtFile"),
            icon: <EditIcon />,
            command: "",
          },
        ]}
      />
      <EditorMenu
        title="편집(E)"
        items={[
          {
            title: "실행 취소",
            icon: <AddIcon />,
            command: "EDIT_UNDO",
          },
          {
            title: "다시 실행",
            icon: <RepeatIcon />,
            command: "EDIT_REDO",
          },
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
